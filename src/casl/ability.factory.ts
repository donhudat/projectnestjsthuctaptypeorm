import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { Article } from '../article/entities/article.entity';

export type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete';
export type Subjects = InferSubjects<typeof Article | typeof User> | 'all';

export type AppAbility = Ability<[Actions, Subjects]>;

@Injectable()
export class AbilityFactory {
  defineAbility(user: User) {
    const { can, cannot, build } = new AbilityBuilder<Ability<[Actions, Subjects]>>(Ability as AbilityClass<AppAbility>);

    if (user.isAdmin) {
      can('manage', 'all');
    } else {
      can('read', Article);
      cannot('delete', Article);
    }

    return build({
      detectSubjectType: item => item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
