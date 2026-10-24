# Counter Picker on your phone

This private GitHub Codespace opens the packaged Counter Picker in your phone's
browser. You do not need to download the ZIP, install Python, or type commands.

1. Sign in to the GitHub account that can access this private repository.
2. Open [Set up this Counter Picker build](https://codespaces.new/marvelagent210-sys/leagueoflegendscounterpicker/tree/counter-picker-download-d9b033ae?quickstart=1).
3. Select **Create codespace** if asked, and allow the first setup to finish.
4. The preview should open automatically. If your browser blocks it, open the
   Codespace's **Ports** tab and select **Open in Browser** for port **8000**,
   labelled **Counter Picker**.
5. Keep that port's visibility **Private**. GitHub requires your sign-in to access
   it. Bookmark the preview URL to return while the Codespace is running.

Closing the editor tab does not stop the background server. A stopped or sleeping
Codespace does not serve the app. Resume your Codespace at
[github.com/codespaces](https://github.com/codespaces) and allow startup to finish.
GitHub's default idle timeout is 30 minutes; the Codespace may sleep even while
the app is open because this server runs in the background.

An existing Codespace using an earlier build does not automatically update. The
setup link above selects the branch containing this build. This is a private
development preview, not permanent hosting.

Codespaces uses your account's compute and storage quota. GitHub Free personal
accounts include 120 core-hours and 15 GB-month of storage per month. A 2-core
Codespace uses two core-hours per running hour. Stop it when finished; delete it
when no longer needed to stop storage usage. Usage beyond your included quota
may be billed if you have enabled paid usage.

This build contains dataset 16.20 (patch 26.20), 115 simulator kits and
6,555 unordered simulated pairings; 58 champions remain in the implementation
queue. Coverage does not certify every mechanic. Startup verifies the ZIP's
checksum and matrix identity before serving it.

Model fingerprint: `d9b033ae559724a9cef49565920eb1e9d2d40eb32d8e61328e29f0f316ab134c`.
See **ACCURACY.md**, **COVERAGE.md**, and the data attribution inside the ZIP.
