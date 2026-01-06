export class CanvasEditor {
    constructor(canvas, template) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.template = template;
        this.texts = {};
    }

    loadImage(src) {
        this.image = new Image();
        return new Promise((resolve, reject) => {
            this.image.onload = () => resolve(this.image);
            this.image.onerror = (err) => reject(err);
            this.image.src = src;
        });
    }

    setText(id, text) {
        this.texts[id] = text;
        if (this.image && this.image.complete) {
            this.draw();
        }
    }


    draw(targetWidth, targetHeight) {
        const { ctx, canvas, image } = this;

        if (!image || !image.complete || (image.naturalWidth === 0 && image.width === 0)) return;

        const imgWidth = image.naturalWidth || image.width;
        const imgHeight = image.naturalHeight || image.height;

        const finalWidth = targetWidth || imgWidth;
        const finalHeight = targetHeight || imgHeight;

        canvas.width = finalWidth;
        canvas.height = finalHeight;

        const scaleX = finalWidth / imgWidth;
        const scaleY = finalHeight / imgHeight;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Ensure a solid background in case the image has transparency 
        // or just to make things more visible on dark backgrounds
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, finalWidth, finalHeight);

        ctx.drawImage(image, 0, 0, finalWidth, finalHeight);

        const baseFontSize = 20;
        const fontSize = Math.max(8, Math.floor(baseFontSize * Math.min(scaleX, scaleY)));
        ctx.fillStyle = "black";
        ctx.font = `${fontSize}px AnimeAce, sans-serif`;
        ctx.textBaseline = "top";


        this.template.balloons.forEach(balloon => {
            const [x, y, w, h] = balloon.rect;
            const text = this.texts[balloon.id] || "";

            // Scale coordinates and dimensions
            const sx = x * scaleX;
            const sy = y * scaleY;
            const sw = w * scaleX;
            const sh = h * scaleY;

            this.drawTextInBox(ctx, text, sx, sy, sw, sh, fontSize * 1.6);
        });
    }

    drawTextInBox(ctx, text, x, y, maxWidth, maxHeight, lineHeight = 32) {
        ctx.textAlign = "center";
        const centerX = x + maxWidth / 2;

        const words = text.split(" ");
        let line = "";
        let yy = y;

        for (let word of words) {
            const test = line + word + " ";
            if (ctx.measureText(test).width > maxWidth) {
                ctx.fillText(line, centerX, yy);
                line = word + " ";
                yy += lineHeight;

                if (yy > y + maxHeight) break;
            } else {
                line = test;
            }
        }

        ctx.fillText(line, centerX, yy);
    }

}
