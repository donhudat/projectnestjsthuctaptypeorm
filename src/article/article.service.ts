import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AbilityFactory, AppAbility } from '../casl/ability.factory';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
    private abilityFactory: AbilityFactory
  ) { }

  create(createArticleDto: CreateArticleDto, user: User) {
    const ability = this.abilityFactory.defineAbility(user);

    if (ability.cannot('create', Article)) {
      throw new ForbiddenException('You are not allowed to create an article');
    }

    const article = this.articleRepository.create(createArticleDto);
    return this.articleRepository.save(article);
  }

  findAll(user: User) {
    const ability = this.abilityFactory.defineAbility(user);

    if (ability.cannot('read', Article)) {
      throw new ForbiddenException('You are not allowed to read articles');
    }

    return this.articleRepository.find();
  }

  findOne(id: number, user: User) {
    const ability = this.abilityFactory.defineAbility(user);
    const article = this.articleRepository.findOneBy({ id });

    if (ability.cannot('read', Article)) {
      throw new ForbiddenException('You are not allowed to read this article');
    }

    return article;
  }

  update(id: number, updateArticleDto: UpdateArticleDto, user: User) {
    const ability = this.abilityFactory.defineAbility(user);
    const article = this.articleRepository.findOneBy({ id });

    if (ability.cannot('update', Article)) {
      throw new ForbiddenException('You are not allowed to update this article');
    }

    return this.articleRepository.update(id, updateArticleDto);
  }

  remove(id: number, user: User) {
    const ability = this.abilityFactory.defineAbility(user);
    const article = this.articleRepository.findOneBy({ id });

    if (ability.cannot('delete', Article)) {
      throw new ForbiddenException('You are not allowed to delete this article');
    }

    return this.articleRepository.delete(id);
  }
}
