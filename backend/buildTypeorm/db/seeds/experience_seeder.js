/** @module Seeds/Profile */
import { faker } from "@faker-js/faker";
import { Seeder } from "../../lib/seed_manager.js";
import { Experience } from "../models/experience.js";
import { User } from "../models/user.js";
// note here that using faker makes testing a bit...hard
// We can set a particular seed for faker, then use it later in our testing!
faker.seed(100);
/**
 * Seeds the ip_history table
 */
export class ExperienceSeeder extends Seeder {
    /**
     * Runs the Profile table's seed
     * @function
     * @param {FastifyInstance} app
     * @returns {Promise<void>}
     */
    async run(app) {
        app.log.info("Seeding Experience...");
        // Remove everything in there currently
        await app.db.experience.delete({});
        // get our users and make each a few IPs
        const users = await User.find();
        for (let i = 0; i < users.length; i++) {
            let newExperience = new Experience();
            newExperience.title = 'experience' + users[i];
            newExperience.experience = "Spot";
            newExperience.sub = users[i].sub;
            newExperience.date = 'Date.now()';
            // Todo: Get rid of placeholder hard coded image link
            newExperience.image = "https://randomfox.ca/images/9.jpg";
            await newExperience.save();
            app.log.info("Finished seeding user: " + i);
        }
    }
}
export const ExperienceSeed = new ExperienceSeeder();
//# sourceMappingURL=experience_seeder.js.map