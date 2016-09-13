import { FortuneCookie } from './connectors';

export const resolvers = {
  Query: {

    fortuneCookie(){
      return FortuneCookie.getOne();
    },
  },
  Mutation: {

  },

}


