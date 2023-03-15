/** @module SeedManager */
import { UserSeed } from "./user_seeder.js";
import { IPHistorySeed } from "./ip_history_seeder.js";
import { ProfileSeed } from "./profile_seeder.js";
import { MatchSeed } from "./match_seeder.js";
import { MessageSeed } from "./message_seeder.js";
/**
 * Options bag for configuring which seeds to run during `pnpm seed`
 */
const SeederOptions = {
    seeds: [
        UserSeed,
        IPHistorySeed,
        ProfileSeed,
        MatchSeed,
        MessageSeed
    ]
};
export default SeederOptions;
//# sourceMappingURL=seeder_options.js.map