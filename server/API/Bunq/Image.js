import { BadRequestError } from "../../Errors";

export default (app, opts, next) => {
    app.get(
        "/:imageId",
        {
            schema: {
                tags: ["bunq"],
                summary: "get the a bunq image by its public uuid",
                response: {
                    200: {
                        description: "Successful response",
                        type: "object",
                        properties: {
                            user: {
                                type: "string"
                            }
                        }
                    }
                },
                security: [
                    {
                        apiKey: []
                    }
                ]
            }
        },
        async (request, reply) => {
            const imageId = request.params.imageId;
            if (!imageId) throw new BadRequestError();

            const imageContents = await app.bunqAutomation.getImage(request.params.identifier, imageId);

            reply.header("Content-Type", "image/png").send(imageContents);
        }
    );

    next();
};
