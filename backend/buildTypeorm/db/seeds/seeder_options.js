/** @module SeedManager */
import { UserSeed } from "./user_seeder.js";
import { ExperienceSeed } from "./experience_seeder.js";
/**
 * Options bag for configuring which seeds to run during `pnpm seed`
 */
const SeederOptions = {
    seeds: [
        UserSeed,
        ExperienceSeed
    ]
};
export default SeederOptions;
//# sourceMappingURL=seeder_options.js.map