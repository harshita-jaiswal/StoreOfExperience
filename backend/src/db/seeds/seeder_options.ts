/** @module SeedManager */
import {UserSeed} from "./user_seeder";
import {Seeder} from "../../lib/seed_manager";
import {ExperienceSeed} from "./experience_seeder";

export type SeederOptionsType = {
	seeds: Array<Seeder>;
}

/**
 * Options bag for configuring which seeds to run during `pnpm seed`
 */
const SeederOptions: any = {
	seeds: [
		UserSeed,
		ExperienceSeed
	]
};

export default SeederOptions;
