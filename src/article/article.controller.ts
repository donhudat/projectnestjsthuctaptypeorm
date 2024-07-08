import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PoliciesGuard } from '../casl/policies.guard';
import { CheckPolicies } from '../casl/policies.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AppAbility, Subjects } from '../casl/ability.factory'; // Import Subjects từ ability.factory
import { PolicyHandler } from '../casl/policy.interface'; // Import PolicyHandler từ policies.decorator

@ApiTags('Article')
@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) { }

  @ApiBearerAuth()
  @Post()
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can('create', 'Article' as Subjects) as PolicyHandler)
  create(@Body() createArticleDto: CreateArticleDto, @Request() req) {
    return this.articleService.create(createArticleDto, req.user);
  }

  @ApiBearerAuth()
  @Get()
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can('read', 'Article' as Subjects) as PolicyHandler)
  findAll(@Request() req) {
    return this.articleService.findAll(req.user);
  }

  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can('read', 'Article' as Subjects) as PolicyHandler)
  findOne(@Param('id') id: string, @Request() req) {
    return this.articleService.findOne(+id, req.user);
  }

  @ApiBearerAuth()
  @Post(':id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can('update', 'Article' as Subjects) as PolicyHandler)
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto, @Request() req) {
    return this.articleService.update(+id, updateArticleDto, req.user);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can('delete', 'Article' as Subjects) as PolicyHandler)
  remove(@Param('id') id: string, @Request() req) {
    return this.articleService.remove(+id, req.user);
  }
}
