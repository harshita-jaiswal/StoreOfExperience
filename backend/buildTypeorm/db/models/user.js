var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/** @module Models/User */
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IPHistory } from "./ip_history.js";
import { Profile } from "./profile.js";
import { Message } from "./message.js";
import { hashSync } from "bcrypt";
/**
 *  Class representing user table
 */
let User = class User extends BaseEntity {
    id;
    name;
    email;
    password;
    // IPHistory
    ips;
    // Profile
    profiles;
    // Message - Sender
    sent;
    // Message - Recipient
    inbox;
    badwords;
    created_at;
    updated_at;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    Column({
        length: 100,
        type: "varchar"
    }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    Column('text'),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    Column({ type: "text", default: hashSync("password", 2) }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    OneToMany((type) => IPHistory, (ip) => ip.user),
    __metadata("design:type", Object)
], User.prototype, "ips", void 0);
__decorate([
    OneToMany((type) => Profile, (p) => p.user),
    __metadata("design:type", Object)
], User.prototype, "profiles", void 0);
__decorate([
    OneToMany((type) => Message, (ms) => ms.sender),
    __metadata("design:type", Object)
], User.prototype, "sent", void 0);
__decorate([
    OneToMany((type) => Message, (mr) => mr.recipient),
    __metadata("design:type", Object)
], User.prototype, "inbox", void 0);
__decorate([
    Column({
        default: 0
    }),
    __metadata("design:type", Number)
], User.prototype, "badwords", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", String)
], User.prototype, "created_at", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", String)
], User.prototype, "updated_at", void 0);
User = __decorate([
    Entity({ name: "users" })
], User);
export { User };
//# sourceMappingURL=user.js.map