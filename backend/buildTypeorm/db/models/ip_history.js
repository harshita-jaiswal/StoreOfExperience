var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/** @module Models/IPHistory */
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.js";
/**
 * IPHistory model - holds all IPs a user has logged in with
 */
let IPHistory = class IPHistory extends BaseEntity {
    id;
    ip;
    user;
    created_at;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", String)
], IPHistory.prototype, "id", void 0);
__decorate([
    Column("text"),
    __metadata("design:type", String)
], IPHistory.prototype, "ip", void 0);
__decorate([
    ManyToOne((type) => User, (user) => user.ips, {
        //adding an IPHistory will also add associated User if it is new, somewhat useless in this example
        cascade: true,
        // if we delete a User, also delete their IP History
        onDelete: "CASCADE"
    }),
    __metadata("design:type", Object)
], IPHistory.prototype, "user", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", String)
], IPHistory.prototype, "created_at", void 0);
IPHistory = __decorate([
    Entity()
], IPHistory);
export { IPHistory };
//# sourceMappingURL=ip_history.js.map