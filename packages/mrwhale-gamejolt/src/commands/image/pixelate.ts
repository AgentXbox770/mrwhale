import { Message } from "@mrwhale-io/gamejolt-client";
import { createCanvas, loadImage } from "canvas";
import * as jimp from "jimp";

import { GameJoltCommand } from "../../client/command/gamejolt-command";
import { uploadImage } from "../../image/upload-image";

export default class extends GameJoltCommand {
  constructor() {
    super({
      name: "pixelate",
      description: "Pixelate your avatar.",
      type: "image",
      usage: "<prefix>pixelate",
      cooldown: 5000,
    });
  }

  async action(message: Message, [level]: [number]): Promise<void> {
    const user = message.firstMentionOrAuthor;
    const responseMsg = await message.reply("Processing please wait...");
    const image = await jimp.read(user.img_avatar);
    image.pixelate(!isNaN(level) ? +level : 5);
    const buffer = await image.getBufferAsync(jimp.MIME_PNG);
    const blurred = await loadImage(buffer);
    const canvas = createCanvas(image.getWidth(), image.getHeight());
    const ctx = canvas.getContext("2d");
    ctx.drawImage(blurred, 0, 0);

    return uploadImage(canvas, responseMsg);
  }
}
