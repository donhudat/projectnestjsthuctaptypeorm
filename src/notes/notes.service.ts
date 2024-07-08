import { Injectable, NotFoundException, ForbiddenException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateNoteDto, UpdateNoteDto } from "./dto";
import { Note } from "./entities/note.entity"; // Đảm bảo import entity của Note

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private noteRepository: Repository<Note>
  ) { }

  async createNote(userId: number, createNoteDto: CreateNoteDto) {
    const { title, description, url } = createNoteDto;

    const newNote = this.noteRepository.create({
      title,
      description,
      url,
      userId,
    });

    await this.noteRepository.save(newNote);

    return newNote;
  }

  async getNoteById(noteId: number, userId: number) {
    const note = await this.noteRepository.findOne({
      where: {
        id: noteId,
      },
    });

    if (!note) {
      throw new NotFoundException('Note not found');
    }

    if (note.userId !== userId) {
      throw new ForbiddenException('You do not have access to view this note');
    }

    return note;
  }

  async getNotes(userId: number) {
    const notes = await this.noteRepository.find({ where: { userId } });
    return notes;
  }

  async updateNote(noteId: number, updateNote: UpdateNoteDto, userId: number) {
    const { title, description, url } = updateNote;

    const note = await this.noteRepository.findOne({
      where: {
        id: noteId,
      },
    });

    if (!note) {
      throw new NotFoundException('Note not found');
    }

    if (note.userId !== userId) {
      throw new ForbiddenException('You do not have access to update this note');
    }

    note.title = title ?? note.title;
    note.description = description ?? note.description;
    note.url = url ?? note.url;

    await this.noteRepository.save(note);

    return note;
  }

  async deleteNote(noteId: number, userId: number) {
    const note = await this.noteRepository.findOne({
      where: {
        id: noteId,
      },
    });

    if (!note) {
      throw new NotFoundException('Note not found');
    }

    if (note.userId !== userId) {
      throw new ForbiddenException('You do not have access to delete this note');
    }

    await this.noteRepository.delete(noteId);

    return { message: 'Note deleted successfully' };
  }
}
