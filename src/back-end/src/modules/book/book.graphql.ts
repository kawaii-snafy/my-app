import {
  Arg,
  Field,
  ID,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { BookEntity } from "./book.entity";

@ObjectType()
export class BookType {
  @Field(() => ID)
  id!: string;

  @Field()
  name!: string;
}

@InputType()
export class BookInput {
  @Field(() => ID, { nullable: true })
  id?: string;

  @Field({ nullable: true })
  name!: string;
}

@Resolver(() => BookType)
export class BookResolver {
  @Query(() => [BookType])
  getBooks() {
    return BookEntity.getRepository().find();
  }

  @Query(() => BookType)
  getBook(@Arg("id", () => ID) id: string) {
    return BookEntity.getRepository().findOne(Number(id));
  }

  @Mutation(() => BookType)
  setBook(@Arg("book", () => BookInput) book: BookInput) {
    return BookEntity.getRepository().save({
      ...book,
      id: !!book.id ? Number(book.id) : undefined,
    });
  }
}
