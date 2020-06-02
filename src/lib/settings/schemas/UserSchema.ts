import { Client, SchemaFolder } from 'klasa';

import Gear from '../../gear';
import Farming from '../../farming';
import { SkillsEnum } from '../../skilling/types';

Client.defaultUserSchema
	.add('totalCommandsUsed', 'integer', { default: 0 })
	.add('GP', 'integer', { default: 0 })
	.add('QP', 'integer', { default: 0 })
	.add('RSN', 'string', { default: null })
	.add('pets', 'any', { default: {} })
	.add('badges', 'integer', { array: true, default: [] })
	.add('bitfield', 'integer', { array: true, default: [] })
	.add('favoriteItems', 'integer', { array: true, default: [] })
	.add('lastDailyTimestamp', 'integer', { default: 1 })
	.add('sacrificedValue', 'integer', { default: 0, maximum: 100_000_000_000, minimum: 0 })
	.add('bank', 'any', { default: {} })
	.add('collectionLogBank', 'any', { default: {} })
	.add('monsterScores', 'any', { default: {} })
	.add('clueScores', 'any', { default: {} })
	.add('minigameScores', 'any', { default: {} })
	.add('lapsScores', 'any', { default: {} })
	.add('bankBackground', 'integer', { default: 1 })
	.add('sacrificedBank', 'any', { default: {} })
	.add('minion', folder =>
		folder
			.add('name', 'string')
			.add('hasBought', 'boolean', { default: false })
			.add('dailyDuration', 'integer', { default: 0 })
			.add('ironman', 'boolean', { default: false })
			.add('icon', 'string', { default: null })
			.add('equippedPet', 'integer', { default: null })
	)
	.add('stats', (folder: SchemaFolder) =>
		folder
			.add('deaths', 'integer', { default: 0 })
			.add('diceWins', 'integer', { default: 0 })
			.add('diceLosses', 'integer', { default: 0 })
			.add('duelLosses', 'integer', { default: 0 })
			.add('duelWins', 'integer', { default: 0 })
			.add('fightCavesAttempts', 'integer', { default: 0 })
			.add('fireCapesSacrificed', 'integer', { default: 0 })
	)
	.add('skills', (folder: SchemaFolder) =>
		folder
			.add(SkillsEnum.Agility, 'integer', { default: 0 })
			.add(SkillsEnum.Cooking, 'integer', { default: 0 })
			.add(SkillsEnum.Fishing, 'integer', { default: 0 })
			.add(SkillsEnum.Mining, 'integer', { default: 0 })
			.add(SkillsEnum.Smithing, 'integer', { default: 0 })
			.add(SkillsEnum.Woodcutting, 'integer', { default: 0 })
			.add(SkillsEnum.Firemaking, 'integer', { default: 0 })
			.add(SkillsEnum.Runecraft, 'integer', { default: 0 })
			.add(SkillsEnum.Crafting, 'integer', { default: 0 })
			.add(SkillsEnum.Prayer, 'integer', { default: 0 })
			.add(SkillsEnum.Fletching, 'integer', { default: 0 })
			.add(SkillsEnum.Thieving, 'integer', { default: 0 })
			.add(SkillsEnum.Farming, 'integer', { default: 0 })
	)
	.add('gear', (folder: SchemaFolder) =>
		folder
			.add('melee', 'any', { default: Gear.defaultGear })
			.add('mage', 'any', { default: Gear.defaultGear })
			.add('range', 'any', { default: Gear.defaultGear })
			.add('misc', 'any', { default: Gear.defaultGear })
			.add('skilling', 'any', { default: Gear.defaultGear })
	)
	.add('farmingpatches', (folder: SchemaFolder) =>
		folder
			.add('herb', 'any', { default: Farming.defaultPatches })
			.add('fruittree', 'any', { default: Farming.defaultPatches })
			.add('tree', 'any', { default: Farming.defaultPatches })
			.add('allotment', 'any', { default: Farming.defaultPatches })
			.add('cactus', 'any', { default: Farming.defaultPatches })
			.add('bush', 'any', { default: Farming.defaultPatches })
			.add('spirit', 'any', { default: Farming.defaultPatches })
			.add('hardwood', 'any', { default: Farming.defaultPatches })
			.add('seaweed', 'any', { default: Farming.defaultPatches })
			.add('vine', 'any', { default: Farming.defaultPatches })
			.add('calquat', 'any', { default: Farming.defaultPatches })
			.add('redwood', 'any', { default: Farming.defaultPatches })
			.add('crystal', 'any', { default: Farming.defaultPatches })
			.add('celastrus', 'any', { default: Farming.defaultPatches })
	);
