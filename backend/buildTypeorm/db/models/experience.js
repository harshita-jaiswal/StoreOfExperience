var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/** @module Models/Match */
import TypeORM from "typeorm";
import { User } from "./user.js";
let Experience = class Experience extends TypeORM.BaseEntity {
    id;
    user;
    title;
    experience;
    sub;
    date;
    image;
    imageData;
    created_at;
    deleted_at;
};
__decorate([
    TypeORM.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Experience.prototype, "id", void 0);
__decorate([
    TypeORM.ManyToOne((type) => User, (user) => user.experience, {
        cascade: true,
        onDelete: "CASCADE"
    }),
    __metadata("design:type", Object)
], Experience.prototype, "user", void 0);
__decorate([
    TypeORM.Column('text'),
    __metadata("design:type", String)
], Experience.prototype, "title", void 0);
__decorate([
    TypeORM.Column('text'),
    __metadata("design:type", String)
], Experience.prototype, "experience", void 0);
__decorate([
    TypeORM.Column('text'),
    __metadata("design:type", String)
], Experience.prototype, "sub", void 0);
__decorate([
    TypeORM.Column('text'),
    __metadata("design:type", String)
], Experience.prototype, "date", void 0);
__decorate([
    TypeORM.Column('text'),
    __metadata("design:type", String)
], Experience.prototype, "image", void 0);
__decorate([
    TypeORM.Column({
        type: "bytea"
    }),
    __metadata("design:type", Buffer)
], Experience.prototype, "imageData", void 0);
__decorate([
    TypeORM.CreateDateColumn(),
    __metadata("design:type", String)
], Experience.prototype, "created_at", void 0);
__decorate([
    TypeORM.DeleteDateColumn(),
    __metadata("design:type", String)
], Experience.prototype, "deleted_at", void 0);
Experience = __decorate([
    TypeORM.Entity()
], Experience);
export { Experience };
//# sourceMappingURL=experience.js.map