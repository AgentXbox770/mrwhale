import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  InteractionResponse,
  Message,
  escapeMarkdown,
} from "discord.js";

import { wiki } from "@mrwhale-io/commands";
import { truncate } from "@mrwhale-io/core";
import { DiscordCommand } from "../../client/command/discord-command";
import { EMBED_COLOR, MAX_EMBED_DESCRIPTION_LENGTH } from "../../constants";

export default class extends DiscordCommand {
  constructor() {
    super(wiki.data);
    this.slashCommandData.addStringOption((option) =>
      option
        .setName("query")
        .setDescription("The query terms.")
        .setRequired(true)
    );
  }

  async action(message: Message, [query]: [string]): Promise<Message> {
    return message.reply({ embeds: [await this.getWikiEmbed(query)] });
  }

  async slashCommandAction(
    interaction: ChatInputCommandInteraction
  ): Promise<InteractionResponse<boolean>> {
    const query = interaction.options.getString("query");

    return interaction.reply({ embeds: [await this.getWikiEmbed(query)] });
  }

  private async getWikiEmbed(query: string): Promise<EmbedBuilder> {
    const wikiSummary = truncate(
      MAX_EMBED_DESCRIPTION_LENGTH - 3,
      await wiki.action(query)
    );

    const embed = new EmbedBuilder()
      .setColor(EMBED_COLOR)
      .setTitle(`Wikipedia page for ${query}`)
      .setDescription(escapeMarkdown(wikiSummary));

    return embed;
  }
}
