/** @module Routes */
import {FastifyInstance, FastifyReply, FastifyRequest, RouteShorthandOptions} from "fastify";
import {User} from "./db/models/user";
import {Experience} from "./db/models/experience";

/**
 * App plugin where we construct our routes
 * @param {FastifyInstance} app our main Fastify app instance
 */
export async function experience_routes(app: FastifyInstance): Promise<void> {


	/**
	 * Route replying to /test path for test-testing
	 * @name get/test
	 * @function
	 */
	app.get("/test", async (request: any, reply: FastifyReply) => {
		reply.send("GET Test");
	});


	/**
	 * Route allowing authentication of a existing user & creating a new user.
	 * @name get/authenticate
	 * @function
	 */
	app.get("/authenticate", {
		onRequest: [app.auth]
	}, async (req: any, reply) => {
		const {name, picture, email, sub } = req.user
		try {

			let theUser = await app.db.user.findOneBy({sub});

			if (theUser) {
				// User has authenticated successfully!
				const token = app.jwt.sign({email, id: theUser.id});
				await reply.send('EXISTING_USER');
			} else {
				const user = new User();
				user.name = name;
				user.email = email;
				user.picture = picture;
				user.sub = sub;
				await user.save();
				await reply.status(200)
					.send(JSON.stringify({user}));
			}
		} catch (err) {
			app.log.error(err);
			await reply.status(500)
				.send("Error: " + err);
		}
	});


	/**
	 * Route to fetch user detail.
	 * @name get/user
	 * @function
	 */
	app.get("/user",{
		onRequest: [app.auth]
	}, async (request: any, reply: FastifyReply) => {
		// This will return all users along with their associated profiles and ip histories via relations
		// https://typeorm.io/find-options
		let user = await app.db.user.find({
			// This allows you to define which fields appear/do not appear in your result.
			select: {
				id: true,
				name: true,
				email: true,
				picture: true,
				updated_at: true,
				created_at: false,
			},
			where: {
				sub: request.user.sub
			},
			// This defines which of our OneToMany/ManyToMany relations we want to return along with each user
			relations: {
				experience: true,
			}
		});
		reply.send(...user);
	});


	/**
	 * Create a new message between given sender and recipient
	 * @name post/add-experience
	 * @function
	 * @param {string} title - experience title
	 * @param {string} experience - experience description
	 * @param {string} date - date of experience
	 * @param {string} image - images
	 * @returns {IPostExperienceResponse} experience used to create experience
	 */
	app.post<{
		Body: {
			title: string,
			date: string,
			experience: string,
			image: string,
			userId: number
		},
		Reply: IPostExperienceResponse
	}>("/add-experience", {
		onRequest: [app.auth]
		}, async (req: any, reply: FastifyReply) => {
			const {title, date, experience, image, userId} = req.body;

			const newExperience = new Experience();
			newExperience.title = title;
			newExperience.date = date;
			newExperience.experience = experience;
			newExperience.image = image;
			newExperience.user = userId;
			newExperience.sub = req.user.sub;
			await newExperience.save();
			await reply.send(JSON.stringify(newExperience));
	});


	const post_experience_opts: RouteShorthandOptions = {
		schema: {
			body: {
				type: 'object',
				properties: {
					title: {type: 'string'},
					experience: {type: 'string'},
					date: {type: 'string'},
					sub: {type: 'string'},
					image: {type: 'string'},
				}
			},
			response: {
				200: {
					type: 'object',
					properties: {
						experience: {type: 'object'},
					}
				}
			}
		}
	};

	/**
	 * Get experience detail.
	 * @name get/experience/:experienceId
	 * @function
	 * @param {number} experienceId - experience id
	 * @returns experience detail
	 */
	app.get("/experience/:experienceId", {
		onRequest: [app.auth]
		}, async (req: any, reply: FastifyReply) => {
			const experienceId = req.params.experienceId;

			let exp = await app.db.experience.find({
				where: {
					id: experienceId,
				},
			});
			reply.send(...exp);
	});

	app.get('/decode', async (request: any, reply: FastifyReply) => {
		const auth = request.headers.authorization;
		const token = auth.split(' ')[1]
	
		await app.jwt.verify(token, (err: any, decoded: any) => {
		  if (err) app.log.error(err)
		  app.log.info('username : ' + decoded.username)
		  reply.send({ foo: decoded })
		})
	  })
}

export type IPostExperienceResponse = {
	/**
	 * Experience created by request
	 */
	experience: Experience
}
