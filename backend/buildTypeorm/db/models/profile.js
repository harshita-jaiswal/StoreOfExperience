var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/** @module Models/Profile */
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.js";
/**
 * Profile model - This is for interacting with the profile table
 * Each profile corresponds to exactly 1 pet owned by a User.
 * This allows each user to have many pet profiles without needing to create more accounts
 */
let Profile = class Profile extends BaseEntity {
    id;
    name;
    picture;
    user;
    created_at;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Profile.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Profile.prototype, "name", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Profile.prototype, "picture", void 0);
__decorate([
    ManyToOne((type) => User, (user) => user.profiles, {
        //adding an IPHistory will also add associated User if it is new, somewhat useless in this example
        cascade: true,
        // if we delete a User, also delete their IP History
        onDelete: "CASCADE"
    }),
    __metadata("design:type", Object)
], Profile.prototype, "user", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", String)
], Profile.prototype, "created_at", void 0);
Profile = __decorate([
    Entity()
], Profile);
export { Profile };
/*
TINDER: you are profile1
when you swipe-right on another profile, say profile2
> Create a new Match row in the Match table and set its matching_profile to our user

if someone else swipes right on YOUR profile, again, profile1
> Create a new match row in the match table and set its matched_Profile to our user

 */
//# sourceMappingURL=profile.js.map