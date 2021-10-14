import { Message } from "@mrwhale-io/gamejolt-client";
import * as math from "mathjs";

import { GameJoltCommand } from "../../client/command/gamejolt-command";

export default class extends GameJoltCommand {
  constructor() {
    super({
      name: "calculate",
      description: "A calculator.",
      type: "useful",
      usage: "<prefix>calculate <calculation>",
      examples: [
        "<prefix>calculate 12 / (2.3 + 0.7)",
        "<prefix>calculate sin(45 deg) ^ 2",
        "<prefix>calculate 12.7 cm to inch",
      ],
      aliases: ["calc"],
    });
  }

  private replaceOperations(expression: string) {
    return expression
      .replace(/[,]/g, ".")
      .replace(/[x]/gi, "*")
      .replace(/[[÷]/gi, "/");
  }

  async action(message: Message, [expression]: [string]): Promise<Message> {
    if (!expression) {
      return message.reply("Please enter a calculation.");
    }

    try {
      const result = math.evaluate(this.replaceOperations(expression));

      return message.reply(result.toString());
    } catch (e) {
      return message.reply("Invalid calculation.");
    }
  }
}
