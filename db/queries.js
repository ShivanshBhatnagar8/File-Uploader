const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createUser(firstName, lastName, email, hashedPassword) {
  const user = await prisma.user.create({
    data: {
      first_name: firstName,
      last_name: lastName,
      username: email,
      password: hashedPassword,
    },
  });
  return user;
}
async function fetchUserForLogin(email) {
  const user = await prisma.user.findUnique({
    where: {
      username: email,
    },
  });
  return user;
}
async function getUserById(userId) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  return user;
}
async function findUserByEmail(email) {
  const user = await prisma.user.findUnique({
    where: {
      username: email,
    },
  });
  return user;
}

async function updatePassword(userPassword, email) {
  const result = await prisma.user.updateMany({
    where: {
      username: email,
    },
    data: {
      password: userPassword,
    },
  });
  if (result.count === 0) {
    return null;
  }
  return result;
}
async function getFolderByName(folderName) {
  const folder = await prisma.folders.findUnique({
    where: {
      name: folderName,
    },
  });
  return folder;
}
async function getFolderByUser(user) {
  const folder = await prisma.folders.findMany({
    where: {
      userId: user.id,
    },
  });
  return folder;
}
async function getFilesByUser(user) {
  const files = await prisma.files.findMany({
    where: {
      userId: user.id,
    },
    include: {
      folder: {
        select: {
          name: true,
        },
      },
    },
  });
  return files;
}

async function createFolderByUser(name, user) {
  const folder = await prisma.folders.create({
    data: {
      name: name,
      createdAt: new Date(Date.now()),
      size: "blank",
      user: {
        connect: {
          id: user.id,
        },
      },
    },
  });
  return folder;
}

async function deleteFolder(folderId) {
  const folder = await prisma.folders.delete({
    where: {
      id: folderId,
    },
  });
  return folder;
}
async function deleteFile(fileId) {
  const file = await prisma.files.delete({
    where: {
      id: fileId,
    },
  });
  return file;
}
async function getFileByFolderId(folderId) {
  const files = await prisma.files.findMany({
    where: {
      folderId: folderId,
    },
  });
  return files;
}
async function createFile(file, user, folder) {
  const uploadedFile = await prisma.files.create({
    data: {
      name: file.filename,
      upload_time: new Date(Date.now()),
      size: file.size,
      user: {
        connect: {
          id: user.id,
        },
      },
      folder: {
        connect: {
          id: folder,
        },
      },
    },
  });
  return uploadedFile;
}

module.exports = {
  createUser,
  findUserByEmail,
  fetchUserForLogin,
  getUserById,
  getFolderByName,
  getFolderByUser,
  getFilesByUser,
  updatePassword,
  createFolderByUser,
  getFileByFolderId,
  deleteFolder,
  deleteFile,
  createFile,
};
