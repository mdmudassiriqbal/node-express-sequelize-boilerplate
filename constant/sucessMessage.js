module.exports = {
	SUCCESS_SUGNUP: 'Signup successfully',
	SUCCESS_PASSWORD_CHANGE: 'You have sucessfully change password',
	SUCCESS_UPDATE: str => `${str} updated successfully`,
	SUCCESS_DELETED: str => `${str} deleted successfully`,
	SUCCESS_ADDED: str => `${str} added successfully`,
	ACTIVE_INACTIVE: status => {
		const blockMsg = `User ${status} successfully`;
		return blockMsg;
	},
	BLOCK_UNBLOCK_PRODUCT: bBlock => {
		const blockMsg = bBlock ? 'Product blocked successfully' : 'Product Unblocked successfully';
		return blockMsg;
	},
	STATUS_PRODUCT: (status, size) => {
		const statusMsg = `${size > 1 ? 'Products' : 'Product'} ${status}!`;
		return statusMsg;
	},
	SUCCESS_SENT_LINK: 'Reset password link has been sent to your email, Kindly check.',
	SUCCESS_RESET_PASSWORD: 'Password reset successfully',
	SUCCESS_EMAIL_VERIFIED: 'Your email has been verified. You have been loggedin',
};
