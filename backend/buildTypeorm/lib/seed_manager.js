/**
 * Base Abstract Seeder class meant to be implemented by derived seeds
 */
export class Seeder {
}
/**
 * Class that manages all Seeder-related duties.
 * Right now, simply runs every Seeder's seed sequentially
 */
class SeedMgr {
    /**
     * Performs seed on all Seeder files
     */
    async seedAll(app, options) {
        // Go through every seeder included in our options (See index.ts)
        for (let i = 0; i < options.seeds.length; i++) {
            // Runs each seeder's "run" method (See db/seeds/user_seeder.ts)
            await options.seeds[i].run(app);
        }
    }
}
const SeedManager = new SeedMgr();
export default SeedManager;
//# sourceMappingURL=seed_manager.js.map