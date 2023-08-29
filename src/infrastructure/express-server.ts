import express from 'express';

export class ExpressServer {
    private express = express();

    constructor(private port: string) {}

    bootstrap(): void {
        this.express.listen(this.port, () => {
            console.log(`> Listening on port ${this.port}`);
        });
    }
}
