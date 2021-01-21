import { Channel, GuildChannel, MessageEmbed, TextChannel } from 'discord.js';
import { randArrItem, randInt, Time } from 'e';
import fs from 'fs';
import { KlasaUser } from 'klasa';
import { Bank } from 'oldschooljs';

import { BitField } from '../constants';
import { GuildSettings } from '../settings/types/GuildSettings';
import { UserSettings } from '../settings/types/UserSettings';
import { hasBasicChannelPerms } from '../util/hasBasicChannelPerms';
import { RandomEvent, RandomEvents } from '.';

const cache = new Map<string, number>();

let triviaQuestions: { q: string; a: string[] }[] = [
	{
		q:
			'Out of Iron Ore and Coal, which is more likely to give Unidentified minerals in the mining guild?',
		a: ['coal']
	}
];
try {
	// eslint-disable-next-line prefer-destructuring
	triviaQuestions = JSON.parse(
		fs.readFileSync('./src/lib/resources/trivia-questions.json').toString()
	).triviaQuestions;
} catch (_) {}

function finalizeEvent(event: RandomEvent, user: KlasaUser, ch: TextChannel) {
	const loot = new Bank();
	if (event.outfit) {
		for (const piece of event.outfit) {
			if (!user.hasItemEquippedOrInBank(piece)) {
				loot.add(piece);
				break;
			}
		}
	}
	loot.add(event.loot.roll());
	user.addItemsToBank(loot.bank);
	ch.send(`You finished the ${event.name} event, and received... ${loot}.`);
}

export async function triggerRandomEvent(ch: Channel, user: KlasaUser) {
	if (!user.settings.get(UserSettings.BitField).includes(BitField.EnabledRandomEvents)) {
		console.log(`${user.username} not getting event because not enabled for user`);
		return;
	}
	if (ch instanceof GuildChannel && !ch.guild.settings.get(GuildSettings.RandomEventsEnabled)) {
		console.log(`${user.username} not getting event because not enabled for guild`);
		return;
	}
	if (!hasBasicChannelPerms(ch)) {
		console.log(`${user.username} not getting event because insufficient channel perms`);
		return;
	}
	const prev = cache.get(user.id);

	// Max 1 event per 30 mins per user
	if (prev && Date.now() - prev < Time.Minute * 30) {
		console.log(`${user.username} not getting event because of 30min limit`);
		return;
	}

	const event = randArrItem(RandomEvents);
	const roll = randInt(1, 2);
	switch (roll) {
		case 1: {
			const randTrivia = randArrItem(triviaQuestions);
			await ch.send(
				`${user}, you've encountered the ${event.name} random event! To complete this event, answer this trivia question... ${randTrivia.q}`
			);
			try {
				await ch.awaitMessages(
					answer =>
						answer.author.id === user.id &&
						randTrivia.a.includes(answer.content.toLowerCase()),
					{
						max: 1,
						time: 30_000,
						errors: ['time']
					}
				);
				finalizeEvent(event, user, ch);
				return;
			} catch (err) {
				return ch.send("You didn't give the correct answer, and failed the random event!");
			}
		}
		case 2: {
			const embed = new MessageEmbed().setImage(
				'https://cdn.discordapp.com/attachments/357422607982919680/801688145120067624/Certer_random_event.png'
			);
			await ch.send(
				`${user}, you've encountered the ${event.name} random event! To complete this event, specify the letter corresponding to the answer in this image:`,
				embed
			);
			try {
				await ch.awaitMessages(
					answer => answer.author.id === user.id && answer.content.toLowerCase() === 'a',
					{
						max: 1,
						time: 30_000,
						errors: ['time']
					}
				);
				finalizeEvent(event, user, ch);
				return;
			} catch (err) {
				return ch.send(`You didn't give the right answer - random event failed!`);
			}
		}

		default: {
			throw new Error('Unmatched switch case');
		}
	}
}
