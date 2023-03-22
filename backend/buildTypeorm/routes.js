import { User } from "./db/models/user.js";
import { Experience } from "./db/models/experience.js";
import { UploadFileToMinio, GetFileFromMinio } from "./lib/minio.js";
/**
 * App plugin where we construct our routes
 * @param {FastifyInstance} app our main Fastify app instance
 */
export async function experience_routes(app) {
    /**
     * Route replying to /test path for test-testing
     * @name get/test
     * @function
     */
    app.get("/test", async (request, reply) => {
        reply.send("GET Test");
    });
    /**
     * Route allowing authentication of a existing user & creating a new user.
     * @name get/authenticate
     * @function
     */
    app.get("/authenticate", {
        onRequest: [app.auth]
    }, async (req, reply) => {
        const { name, picture, email, sub } = req.user;
        try {
            const theUser = await retrieveUserId(app, sub);
            if (theUser) {
                // User has authenticated successfully!
                const token = app.jwt.sign({ email, id: theUser.id });
                await reply.send('EXISTING_USER');
            }
            else {
                const user = new User();
                user.name = name;
                user.email = email;
                user.picture = picture;
                user.sub = sub;
                await user.save();
                await reply.status(200)
                    .send(JSON.stringify({ user }));
            }
        }
        catch (err) {
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
    app.get("/user", {
        onRequest: [app.auth]
    }, async (request, reply) => {
        let user = await app.db.user.find({
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
     * Route to experiences.
     * @name get/experiences
     * @function
     */
    app.get("/experiences", {
        onRequest: [app.auth]
    }, async (req, reply) => {
        const { sub } = req.user;
        const theUser = await retrieveUserId(app, sub);
        let experiences = await app.db.experience.find({
            where: {
                user: {
                    id: theUser?.id
                }
            },
        });
        reply.send(experiences);
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
    // app.post<{
    // 	Body: {
    // 		title: string,
    // 		date: string,
    // 		experience: string,
    // 		image: string,
    // 	},
    // 	Reply: IPostExperienceResponse
    // }>("/add-experience", {
    app.post("/add-experience", {
        onRequest: [app.auth]
    }, async (req, reply) => {
        const { sub } = req.user;
        const theUser = await retrieveUserId(app, sub);
        // const {title, date, experience, image} = req.body;
        let fileData = await req.file();
        console.log('filedate-----', fileData);
        // if (Array.isArray(fileData)){
        // 	console.log("TODO: Array")
        // }else{
        // 	var newFile = new MYFile()
        // 	newFile.name = fileData.name
        // 	newFile.data = fileData.data.toString('base64')
        // 	newFile.mimeType = fileData.mimetype
        // }
        const newExperience = new Experience();
        newExperience.title = "fileData.title.value";
        newExperience.date = "fileData.date.value";
        newExperience.experience = "fileData.experience.value";
        newExperience.image = fileData.file;
        newExperience.user = theUser?.id;
        newExperience.sub = req.user.sub;
        console.log('exp datta----', newExperience);
        // newExperience.title = title;
        // newExperience.date = date;
        // newExperience.experience = experience;
        // newExperience.image = fileData.data;
        // newExperience.user = theUser?.id;
        // newExperience.sub = req.user.sub;
        await newExperience.save();
        await reply.send(JSON.stringify(newExperience));
    });
    /**
     * Create a new message between given sender and recipient
     * @name post/upload-image
     * @function
     */
    app.post("/upload-image", {
        onRequest: [app.auth]
    }, async (req, reply) => {
        const data = await req.file();
        let upload = await UploadFileToMinio(data);
        await reply.send(upload);
    });
    const post_experience_opts = {
        schema: {
            body: {
                type: 'object',
                properties: {
                    title: { type: 'string' },
                    experience: { type: 'string' },
                    date: { type: 'string' },
                    sub: { type: 'string' },
                    image: { type: 'string' },
                }
            },
            response: {
                200: {
                    type: 'object',
                    properties: {
                        experience: { type: 'object' },
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
    }, async (req, reply) => {
        const experienceId = req.params.experienceId;
        let exp = await app.db.experience.find({
            select: {
                image: true
            },
            where: {
                id: experienceId,
            },
        });
        let file = await GetFileFromMinio("copyright2.png");
        console.log('exp---', exp);
        // // let upload = await UploadFileToMinio(data);
        // // exp[0].image = file
        // // console.log('test-----', {...exp});
        // // exp = [...exp, "image": file]
        // let respBuild = {...exp};
        // let newObj = {...respBuild['0'], 'image': file}
        // console.log('test-----8888888', newObj, respBuild['0'].image);
        // reply.headers(content-type: 'multipart/form-data')
        reply.header('Content-Type', 'image/png');
        // // respBuild['0'].imagef
        reply.send(exp);
    });
    app.get('/decode', async (request, reply) => {
        const auth = request.headers.authorization;
        const token = auth.split(' ')[1];
        await app.jwt.verify(token, (err, decoded) => {
            if (err)
                app.log.error(err);
            app.log.info('username : ' + decoded.username);
            reply.send({ foo: decoded });
        });
    });
}
const retrieveUserId = async (app, sub) => {
    let theUser = await app.db.user.findOneBy({ sub });
    return theUser;
};
//# sourceMappingURL=routes.js.map