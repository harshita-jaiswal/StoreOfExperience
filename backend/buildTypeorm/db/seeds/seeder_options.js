/** @module SeedManager */
import { UserSeed } from "./user_seeder.js";
import { IPHistorySeed } from "./ip_history_seeder.js";
import { ProfileSeed } from "./profile_seeder.js";
/**
 * Options bag for configuring which seeds to run during `pnpm seed`
 */
const SeederOptions = {
    seeds: [
        UserSeed,
        IPHistorySeed,
        ProfileSeed
    ]
};
export default SeederOptions;
//# sourceMappingURL=seeder_options.js.map