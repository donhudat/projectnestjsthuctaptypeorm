import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { MyJwtGuard } from '../guard';
import { NoteService } from './notes.service';
import { GetUser } from '../auth/decorator';
import { CreateNoteDto, UpdateNoteDto } from './dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Note')
@UseGuards(MyJwtGuard)
@Controller('notes')
export class NoteController {
  constructor(private noteService: NoteService) {

  }
  @ApiBearerAuth()
  @Get()
  getNotes(@GetUser('id') userId: number) {
    return this.noteService.getNotes(userId)
  }

  @ApiBearerAuth()
  @Get(':id')
  getNoteById(
    @Param('id', ParseIntPipe) noteId: number,
    @GetUser('id') userId: number
  ) {
    return this.noteService.getNoteById(noteId, userId);
  }

  @ApiBearerAuth()
  @Post()
  createNote(
    @GetUser('id') userId: number,
    @Body() createNoteDto: CreateNoteDto
  ) {
    console.log("data")
    return this.noteService.createNote(userId, createNoteDto)
  }

  @ApiBearerAuth()
  @Patch(':id')
  updateNote(
    @Param('id', ParseIntPipe) noteId: number,
    @Body() updateNote: UpdateNoteDto,
    @GetUser('id') userId: number
  ) {
    return this.noteService.updateNote(noteId, updateNote, userId);
  }

  @ApiBearerAuth()
  @Delete(':id')
  deleteNote(
    @Param('id', ParseIntPipe) noteId: number,
    @GetUser('id') userId: number
  ) {
    return this.noteService.deleteNote(noteId, userId)
  }

}
