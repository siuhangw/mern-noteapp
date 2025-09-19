import mongoose from 'mongoose';

const { Schema } = mongoose;
const NoteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, 'Title is required'],
      minlength: [1, 'Title must not be empty'],
      maxlength: [200, 'Title too long']
    },
    content: {
      type: String,
      default: '',
      maxlength: [10000, 'Content too long']
    }
  }, { timestamps: true }
)
const Note = mongoose.model('Note', NoteSchema);
export default Note;

// const NoteSchema = new Schema(
//   {
//     title: {
//       type: String,
//       trim: true,
//       required: [true, 'Title is required'],
//       minlength: [1, 'Title must not be empty'],
//       maxlength: [200, 'Title too long']
//     },
//     content: {
//       type: String,
//       default: '',
//       maxlength: [10000, 'Content too long']
//     },
//     user: {
//       type: Schema.Types.ObjectId,
//       ref: 'User',
//       required: true,
//       index: true
//     },
//     tags: {
//       type: [String],
//       default: [],
//       validate: {
//         validator: arr => arr.length <= 20,
//         message: 'Too many tags'
//       }
//     },
//     pinned: {
//       type: Boolean,
//       default: false,
//       index: true
//     },
//     archived: {
//       type: Boolean,
//       default: false,
//       index: true
//     },
//     color: {
//       type: String,
//       trim: true,
//       default: null,
//       match: [/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, 'Color must be a valid hex or null'],
//     },
//     deletedAt: {
//       type: Date,
//       default: null,
//       index: true
//     }
//   },
//   {
//     timestamps: true,
//     versionKey: false
//   }
// );

// // Compound indexes for common queries
// NoteSchema.index({ user: 1, updatedAt: -1 });
// NoteSchema.index({ user: 1, pinned: -1, updatedAt: -1 });
// NoteSchema.index({ user: 1, archived: 1, updatedAt: -1 });
// NoteSchema.index({ user: 1, deletedAt: 1 });

// NoteSchema.methods.softDelete = function () {
//   if (!this.deletedAt) this.deletedAt = new Date();
//   return this.save();
// };

// NoteSchema.methods.restore = function () {
//   if (this.deletedAt) this.deletedAt = null;
//   return this.save();
// };

// NoteSchema.statics.findActiveByUser = function (userId, extraFilter = {}) {
//   return this.find({
//     user: userId,
//     deletedAt: null,
//     archived: false,
//     ...extraFilter
//   });
// };

// const Note = mongoose.models.Note || mongoose.model('Note', NoteSchema);

// export default Note;