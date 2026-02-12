
import codecs
import re

content = """# 💌 Interactive Valentine Letter

A charming, interactive web-based Valentine's letter designed to deliver a special message with a touch of playfulness and many cute cats.

## 📺 Project Demo

[![Watch Project Demo](Public/Screenshots/Screenshot%202026-02-11%20205331.png)](Public/Screenshots/demo.mp4)

## 📸 Screenshots

"""

# Table generation - Strict
h1 = "Opening the Letter"
h2 = "The Celebration"
c1 = "![Opening the Letter](Public/Screenshots/Screenshot%202026-02-11%20205331.png)"
c2 = "![The Celebration](Public/Screenshots/Screenshot%202026-02-11%20205344.png)"

# Calculate widths - ensure even
w1 = max(len(h1), len(c1)) + 4  # +4 for padding (2 on each side)
w2 = max(len(h2), len(c2)) + 4

def pad_center(text, width):
    padding = width - len(text)
    left = padding // 2
    right = padding - left
    return " " * left + text + " " * right

row1 = f"|{pad_center(h1, w1)}|{pad_center(h2, w2)}|"
sep = f"| :{'-' * (w1 - 2)}: | :{'-' * (w2 - 2)}: |" # -2 for the colons
# Recalculating sep to correspond to exact width
# The sep string length for a column of width W should be W.
# ":---:" is length 5.
# If W=10, we need :--------: (1+8+1=10 chars)
# So dashes = W - 2.
dash1 = w1 - 2
dash2 = w2 - 2
sep = f"|:{'-' * dash1}:|:{'-' * dash2}:|"
row2 = f"|{pad_center(c1, w1)}|{pad_center(c2, w2)}|"

table = f"{row1}\n{sep}\n{row2}"
content += table

content += """

## 📂 Project Structure

```bash
├── index.html          # Main structure
├── script.js           # Interactive logic
├── style.css           # Styling and animations
├── Public/             # Assets folder
│   ├── Screenshots/    # Demo video and images
│   └── ...             # Other assets
└── README.md           # Project documentation
```

## 🚀 How to Run

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/toxicbishop/Valentine-Letter.git
   cd "Valentine Letter"
   ```

2. **Open the Project:**
   Simply open `index.html` in your favorite web browser or use a Live Server extension in VS Code.

## 🎨 Assets Used

- `cat_heart.gif`: The greeting cat.
- `cat_dance.gif`: The celebratory cat.
- Custom pixel-art buttons (`yes.png`, `no.png`).
- `heart-bg.jpg`: Background image.

## ❤️ Credits

Made with ❤️ and a little bit of code. This project features adorable cat themes to make your Valentine's Day special!
"""

try:
    with codecs.open("c:/Code/Repo/Valentine Letter/README.md", "w", "utf-8") as f:
        f.write(content)
    print("Successfully wrote README.md")
except Exception as e:
    print(f"Error: {e}")
