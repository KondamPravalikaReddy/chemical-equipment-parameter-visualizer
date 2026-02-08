import sys
import requests
from PyQt5.QtWidgets import (
    QApplication,
    QWidget,
    QPushButton,
    QVBoxLayout,
    QFileDialog,
)
import matplotlib.pyplot as plt


class App(QWidget):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Chemical Equipment Visualizer")
        self.setGeometry(300, 200, 400, 200)

        layout = QVBoxLayout()

        btn = QPushButton("Upload CSV")
        btn.clicked.connect(self.upload)
        layout.addWidget(btn)

        self.setLayout(layout)

    def upload(self):
        # Select CSV file
        file, _ = QFileDialog.getOpenFileName(
            self, "Open CSV", "", "CSV Files (*.csv)"
        )

        if not file:
            return

        # Send file to Django backend
        with open(file, "rb") as f:
            r = requests.post(
                "http://127.0.0.1:8000/api/upload/",
                files={"file": f},
                
            )

        # Parse response
        data = r.json()

        # Debug output
        print("Backend response:", data)

        # Safe check before plotting
        if r.status_code == 200 and "type_distribution" in data:
            plt.figure()
            plt.bar(
                data["type_distribution"].keys(),
                data["type_distribution"].values(),
            )
            plt.xlabel("Equipment Type")
            plt.ylabel("Count")
            plt.title("Equipment Type Distribution")
            plt.show()
        else:
            print("API ERROR or unexpected response")


# ---- App Entry Point ----
if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = App()
    window.show()
    sys.exit(app.exec_())
