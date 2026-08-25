from pathlib import Path
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]


def lerp(a, b, t):
    return int(round(a + (b - a) * t))


def gradient_color(t):
    stops = [(0.0, (131, 215, 255)), (0.55, (169, 239, 228)), (1.0, (255, 225, 143))]
    for index in range(len(stops) - 1):
        start_t, start = stops[index]
        end_t, end = stops[index + 1]
        if start_t <= t <= end_t:
            local = (t - start_t) / (end_t - start_t)
            return tuple(lerp(start[channel], end[channel], local) for channel in range(3)) + (255,)
    return stops[-1][1] + (255,)


def make_icon(size):
    scale = size / 512
    image = Image.new("RGBA", (size, size), (248, 251, 255, 255))
    draw = ImageDraw.Draw(image)
    center = (int(256 * scale), int(275 * scale))
    radius = int(170 * scale)
    for inset in range(radius, 0, -1):
        t = 1 - (inset / radius)
        color = gradient_color(t)
        box = [center[0] - inset, center[1] - inset, center[0] + inset, center[1] + inset]
        draw.ellipse(box, fill=color)

    white_width = max(4, int(20 * scale))
    draw.ellipse([center[0] - radius, center[1] - radius, center[0] + radius, center[1] + radius], outline="white", width=white_width)
    spoke_width = max(3, int(14 * scale))
    for x1, y1, x2, y2 in [(256, 105, 256, 445), (86, 275, 426, 275), (136, 155, 376, 395), (376, 155, 136, 395)]:
        draw.line([int(x1 * scale), int(y1 * scale), int(x2 * scale), int(y2 * scale)], fill=(255, 255, 255, 225), width=spoke_width)

    hub_radius = int(54 * scale)
    draw.ellipse([center[0] - hub_radius, center[1] - hub_radius, center[0] + hub_radius, center[1] + hub_radius], fill="white", outline=(49, 88, 115, 255), width=max(3, int(10 * scale)))
    pointer = [(int(256 * scale), int(42 * scale)), (int(298 * scale), int(116 * scale)), (int(214 * scale), int(116 * scale))]
    draw.polygon(pointer, fill=(227, 86, 103, 255))
    draw.line(pointer + [pointer[0]], fill="white", width=max(3, int(8 * scale)), joint="curve")
    dot = int(14 * scale)
    draw.ellipse([center[0] - dot, center[1] - dot, center[0] + dot, center[1] + dot], fill=(49, 88, 115, 255))
    return image


for icon_size in (192, 512):
    output = ROOT / "assets" / f"app-icon-{icon_size}.png"
    make_icon(icon_size).save(output, optimize=True)
    print(f"created {output.name}")
