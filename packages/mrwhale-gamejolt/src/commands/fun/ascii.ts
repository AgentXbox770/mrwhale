import * as profanity from "profanity-util";

import { ascii } from "@mrwhale-io/commands";
import { Message } from "@mrwhale-io/gamejolt-client";

import { GameJoltCommand } from "../../client/command/gamejolt-command";

export default class extends GameJoltCommand {
  constructor() {
    super(ascii.data);
  }

  async action(message: Message, [text]: [string]): Promise<Message> {
    const asciiResult = await ascii.action(profanity.purify(text)[0]);

    return message.reply(`${asciiResult}`);
  }
}
