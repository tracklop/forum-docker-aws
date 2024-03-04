import { Model, DataTypes } from 'sequelize';

class Message extends Model {
	static init(sequelize) {
		return super.init(
			{
				id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: DataTypes.INTEGER,
				},
				username: {
					allowNull: false,
					type: DataTypes.STRING(30),
				},
				content: {
					allowNull: false,
					type: DataTypes.STRING(255),
				},
				send_datetime: {
					allowNull: true,
					default: null,
					type: DataTypes.DATE,
				},
			},
			{
				sequelize,
			}
		);
	}
}

export default Message;
