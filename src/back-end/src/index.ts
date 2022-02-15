import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageProductionDefault,
} from "apollo-server-core";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { BookResolver } from "./modules/book/book.graphql";

const bootstrap = async () => {
  try {
    const connection = await createConnection();

    const schema = await buildSchema({
      resolvers: [BookResolver],
    });

    const app = new ApolloServer({
      schema,
      plugins: [
        process.env.NODE_ENV === "production"
          ? ApolloServerPluginLandingPageProductionDefault({ footer: false })
          : ApolloServerPluginLandingPageGraphQLPlayground(),
      ],
    });

    app.listen().then(({ url }) => {
      console.log(`🚀 Server ready at ${url}`);
      console.log(`🚀 ${process.env.NODE_ENV}`);
    });
  } catch (error: any) {
    throw new Error(error);
  }
};

bootstrap();
