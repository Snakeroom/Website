import Card from "../card";
import { InputBlock } from "./divisions-row";

function isNonEmptyArray(array) {
	return Array.isArray(array) && array.length > 0;
}

const roles = new Map()
	.set("owner", "Owner")
	.set("manager", "Manager")
	.set("user", "User");

function MemberCard({ member }) {
	return (
		<Card>
			<h4>{member.username}</h4>
			<InputBlock>Role: {roles.get(member.role)}</InputBlock>
		</Card>
	);
}

export default function MembersRow({ members }) {
	if (!isNonEmptyArray(members)) {
		return null;
	}

	return (
		<>
			<h3>Members</h3>
			{members.map((member) => (
				<MemberCard key={member.uid} member={member} />
			))}
		</>
	);
}
