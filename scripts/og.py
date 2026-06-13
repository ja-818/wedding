from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
BG = (13, 12, 11)
WHITE = (245, 240, 232)
MUTED = (170, 162, 150)
FAINT = (120, 114, 104)
LINE = (74, 68, 60)

img = Image.new("RGB", (W, H), BG)
d = ImageDraw.Draw(img)

# Glow sutil arriba
for i in range(220):
    a = int(16 * (1 - i / 220))
    d.line([(0, i), (W, i)], fill=(BG[0] + a, BG[1] + a, BG[2] + a))

# Marco
m = 46
d.rectangle([m, m, W - m, H - m], outline=LINE, width=1)

PAL = "/System/Library/Fonts/Palatino.ttc"
def f(size, idx=0):
    return ImageFont.truetype(PAL, size, index=idx)

def center(text, font, y, fill):
    w = d.textlength(text, font=font)
    d.text(((W - w) / 2, y), text, font=font, fill=fill)
    return w

def spaced(s, gap=" "):
    return gap.join(list(s))

# Eyebrow
center(spaced("NOS CASAMOS"), f(26), 150, MUTED)

# Nombres con "&" en otro color/tamaño
n_font = f(104)
amp_font = f(72, idx=1)  # italic si existe
left, amp, right = "Valentina", "&", "Julián"
w_left = d.textlength(left + " ", font=n_font)
w_amp = d.textlength(amp + " ", font=amp_font)
w_right = d.textlength(right, font=n_font)
total = w_left + w_amp + w_right
x = (W - total) / 2
y = 250
d.text((x, y), left + " ", font=n_font, fill=WHITE)
d.text((x + w_left, y + 18), amp + " ", font=amp_font, fill=FAINT)
d.text((x + w_left + w_amp, y), right, font=n_font, fill=WHITE)

# Fecha / lugar
center("28 de Junio  ·  Bogotá", f(40), 410, MUTED)

# Pie
center(spaced("CAÑA"), f(22), 500, FAINT)
center("Aguardientería y Bodega", f(24), 536, FAINT)

img.save("assets/og.png")
print("ok", img.size)
