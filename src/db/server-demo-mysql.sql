/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80019
 Source Host           : localhost:3306
 Source Schema         : server-demo-mysql

 Target Server Type    : MySQL
 Target Server Version : 80019
 File Encoding         : 65001

 Date: 23/03/2020 18:06:42
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for sys_r_user_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_r_user_role`;
CREATE TABLE `sys_r_user_role`  (
  `userId` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `roleId` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`userId`, `roleId`) USING BTREE,
  INDEX `IDX_ddc61dd9b605693ef1c8cbc032`(`userId`) USING BTREE,
  INDEX `IDX_3fc14d2a0827c210e60857e6a8`(`roleId`) USING BTREE,
  CONSTRAINT `FK_3fc14d2a0827c210e60857e6a85` FOREIGN KEY (`roleId`) REFERENCES `sys_role` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `FK_ddc61dd9b605693ef1c8cbc0323` FOREIGN KEY (`userId`) REFERENCES `sys_user` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_r_user_role
-- ----------------------------
INSERT INTO `sys_r_user_role` VALUES ('3571a123-0454-49b4-a2bc-8b30a37f0b14', '21be076f-f668-4880-8812-99b56bc56413');
INSERT INTO `sys_r_user_role` VALUES ('3571a123-0454-49b4-a2bc-8b30a37f0b14', '7e8627d9-dc78-414b-b9ca-233911f8d7ec');

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '角色ID',
  `name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '角色名称',
  `enable` tinyint(0) NULL DEFAULT 1 COMMENT '是否可用',
  `deleteFlag` tinyint(0) NOT NULL DEFAULT 0 COMMENT '是否删除',
  `createTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_role
-- ----------------------------
INSERT INTO `sys_role` VALUES ('21be076f-f668-4880-8812-99b56bc56413', '销售经理', 1, 0, '2020-03-23 15:27:16.609010', '2020-03-23 15:27:16.609010');
INSERT INTO `sys_role` VALUES ('4e40e456-faa4-467b-ad30-13750cc56a26', '管理员', 1, 0, '2020-03-23 15:27:44.101510', '2020-03-23 15:27:44.101510');
INSERT INTO `sys_role` VALUES ('7e8627d9-dc78-414b-b9ca-233911f8d7ec', '销售主管', 1, 0, '2020-03-23 15:28:07.693291', '2020-03-23 15:28:07.693291');

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户ID',
  `account` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '账号',
  `name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '姓名',
  `email` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '邮箱',
  `phone` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '手机号码',
  `birthday` date NULL DEFAULT NULL COMMENT '生日',
  `enable` tinyint(0) NULL DEFAULT 1 COMMENT '是否可用',
  `deleteFlag` tinyint(0) NOT NULL DEFAULT 0 COMMENT '是否删除',
  `createTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_user
-- ----------------------------
INSERT INTO `sys_user` VALUES ('049075cf-cef7-415d-bbc0-1b0d044f8135', 'liming', '李明', 'liming@email.com', '18612345678', '1990-01-01', 1, 0, '2020-03-23 16:11:18.419506', '2020-03-23 16:11:18.419506');
INSERT INTO `sys_user` VALUES ('3571a123-0454-49b4-a2bc-8b30a37f0b14', 'admin', '管理员', 'admin@mymail.com', '18688886666', NULL, 1, 0, '2020-03-23 15:24:40.755187', '2020-03-23 15:24:40.755187');
INSERT INTO `sys_user` VALUES ('5f52bf67-d50e-42b1-9c04-d0bdb8f7086c', 'lixh', '李向华', 'lixianghua@mymail.com', '18988889999', '1990-01-01', 1, 0, '2020-03-23 15:25:58.605114', '2020-03-23 15:25:58.605114');

SET FOREIGN_KEY_CHECKS = 1;
