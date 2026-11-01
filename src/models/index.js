const User = require('./User');
const Business = require('./Business');
const FollowUp = require('./FollowUp');
const FollowUpRecord = require('./FollowUpRecord');


User.hasMany(FollowUp, {
    foreignKey: 'userId',
    as: 'followUps'
});

FollowUp.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
});

Business.hasMany(FollowUp, {
    foreignKey: 'businessId', 
    as: 'followUps'
});

FollowUp.belongsTo(Business, {
    foreignKey: 'businessId',
    as: 'business'
});

FollowUp.hasMany(FollowUpRecord, {
    foreignKey: 'followUpId',
    as: 'records'
});

FollowUpRecord.belongsTo(FollowUp, {
    foreignKey: 'followUpId',
    as: 'followUp'
});

module.exports = {
    User,
    Business,
    FollowUp,
    FollowUpRecord
};