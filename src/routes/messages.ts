import express, { Request, Response } from 'express';
import fs from 'fs/promises';
import path from 'path';

const router = express.Router();
const messagesPath = path.join(__dirname, '../../messages');


router.get('/', async (req: Request, res: Response) => {
    try {
        const files = await fs.readdir(messagesPath);
        files.sort().reverse();

        const recentFiles = files.slice(0, 5);
        const messages = await Promise.all(recentFiles.map(async (file) => {
            const filePath = path.join(messagesPath, file);


            const content = await fs.readFile(filePath, 'utf-8');
            return { ...JSON.parse(content), datetime: file.split('.')[0] };
        }));

        res.json(messages);
    } catch (error) {
        console.error('Error reading messages:', error);
        res.status(500).send('Error reading messages');
    }

});

export default router;
