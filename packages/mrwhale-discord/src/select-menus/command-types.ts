import {
  Message,
  StringSelectMenuBuilder,
  StringSelectMenuInteraction,
  StringSelectMenuOptionBuilder,
} from "discord.js";

import { COMMAND_TYPE_NAMES, CommandTypes, capitalise } from "@mrwhale-io/core";
import { DiscordSelectMenu } from "../client/menu/discord-select-menu";
import { SelectMenus } from "../types/select-menus";
import { getCommandsByTypeEmbed } from "../util/help";

export default class extends DiscordSelectMenu {
  constructor() {
    super({
      name: SelectMenus.CommandTypes,
    });
  }

  async action(
    interaction: StringSelectMenuInteraction
  ): Promise<Message<boolean>> {
    const embed = await getCommandsByTypeEmbed(
      interaction.values[0],
      this.botClient
    );

    interaction.deferUpdate();

    return await interaction.message.edit({ embeds: [embed] });
  }

  getSelectMenuBuilder(): StringSelectMenuBuilder {
    const selectCategoryMenu = new StringSelectMenuBuilder()
      .setCustomId(this.name)
      .setPlaceholder("Make a selection")
      .setMinValues(1)
      .setMaxValues(1);

    for (let category of COMMAND_TYPE_NAMES) {
      selectCategoryMenu.addOptions(
        new StringSelectMenuOptionBuilder()
          .setLabel(capitalise(category))
          .setValue(category)
          .setEmoji(this.getEmoji(category))
      );
    }

    return selectCategoryMenu;
  }

  private getEmoji(commandType: CommandTypes): string {
    const emojis: Record<CommandTypes, string> = {
      ["fun"]: "😀",
      ["utility"]: "🔧",
      ["admin"]: "🛡️",
      ["useful"]: "🖨️",
      ["game"]: "🎲",
      ["image"]: "🖼️",
      ["level"]: "🏆",
    };

    return emojis[commandType];
  }
}
