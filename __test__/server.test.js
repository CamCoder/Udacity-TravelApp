import {app, express} from '../src/server/index'


describe('Check app', () => {
    test('Check if app defined', () => {
        expect(app).toBeInstanceOf(express);
    })
})
