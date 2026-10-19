"""Start the packaged Counter Picker when its Codespace starts or resumes."""

import argparse
import hashlib
import json
import os
from pathlib import Path
import subprocess
import sys
import tempfile
import time
import urllib.error
import urllib.request
import zipfile

ARCHIVE_SHA256 = "e955159e56792bedb2458a65fb8124e45cd8b5ec6ff423879dab005b2df9a0de"
MODEL_FINGERPRINT = "158c0a49217720e7f577473a978738b4398ba1ad18390275c2d4ebad164a57a9"
SIMULATOR_KITS = 91
UNORDERED_PAIRINGS = 4095


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--port", type=int, default=8000)
    parser.add_argument("--state-dir", type=Path)
    args = parser.parse_args()
    if not 1 <= args.port <= 65535:
        parser.error("port must be between 1 and 65535")

    repository = Path(__file__).resolve().parents[1]
    archive = repository / "counter-picker-private.zip"
    if hashlib.sha256(archive.read_bytes()).hexdigest() != ARCHIVE_SHA256:
        raise RuntimeError("The build ZIP has changed. Update this preview for the new verified build.")

    state = args.state_dir or Path(tempfile.gettempdir()) / f"counter-picker-preview-{ARCHIVE_SHA256[:12]}"
    state.mkdir(parents=True, exist_ok=True)
    application = state / "counter-picker"
    marker_path = application / "preview-ready.json"
    expected_marker = {"archiveSha256": ARCHIVE_SHA256, "fingerprint": MODEL_FINGERPRINT}
    if not marker_path.is_file() or json.loads(marker_path.read_text()) != expected_marker:
        with zipfile.ZipFile(archive) as bundle:
            for member in bundle.infolist():
                if not (state / member.filename).resolve().is_relative_to(state.resolve()):
                    raise RuntimeError("The build ZIP contains an invalid file path.")
            bundle.extractall(state)
        dataset = json.loads((application / "data/16.20/simulated.json").read_text())
        if dataset.get("simulation", {}).get("fingerprint") != MODEL_FINGERPRINT:
            raise RuntimeError("The build contains an unexpected simulation dataset.")
        matchups = dataset.get("matchups", {})
        if len(matchups) != SIMULATOR_KITS or any(
            set(rivals) != set(matchups) - {champion}
            for champion, rivals in matchups.items()
        ) or SIMULATOR_KITS * (SIMULATOR_KITS - 1) // 2 != UNORDERED_PAIRINGS:
            raise RuntimeError("The build contains an incomplete champion matchup matrix.")
        marker_path.write_text(json.dumps(expected_marker))

    # These readiness requests only reach this same machine's loopback interface.
    local_requests = urllib.request.build_opener(urllib.request.ProxyHandler({}))
    origin = f"http://127.0.0.1:{args.port}"

    def ready():
        try:
            with local_requests.open(origin + "/preview-ready.json", timeout=1) as response:
                if json.load(response) != expected_marker:
                    return False
            with local_requests.open(origin + "/", timeout=1) as response:
                return response.status == 200 and b'<div id="root"' in response.read()
        except (OSError, ValueError, urllib.error.URLError):
            return False

    if not ready():
        log_path = state / f"server-{args.port}.log"
        with log_path.open("a") as log:
            server = subprocess.Popen(
                [sys.executable, "-u", "-m", "http.server", str(args.port),
                 "--bind", "0.0.0.0", "--directory", str(application)],
                stdin=subprocess.DEVNULL, stdout=log, stderr=subprocess.STDOUT,
                start_new_session=True,
            )
        (state / f"server-{args.port}.pid").write_text(str(server.pid))
        deadline = time.monotonic() + 20
        while time.monotonic() < deadline:
            if server.poll() is not None:
                raise RuntimeError(f"Preview failed to start. See {log_path}.")
            if ready():
                break
            time.sleep(0.2)
        else:
            server.terminate()
            raise RuntimeError(f"Preview did not become ready. See {log_path}.")

    print(f"Counter Picker is ready on port {args.port}.")
    codespace_name = os.environ.get("CODESPACE_NAME")
    forwarding_domain = os.environ.get("GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN")
    if codespace_name and forwarding_domain:
        print(f"Open https://{codespace_name}-{args.port}.{forwarding_domain}")
    print("Keep port visibility Private. Sign in to GitHub to open the preview.")


if __name__ == "__main__":
    main()
