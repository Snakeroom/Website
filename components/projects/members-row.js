import Card from "../card";
import { InputBlock } from "./divisions-row";

function isNonEmptyArray(array) {
	return Array.isArray(array) && array.length > 0;
}

const roles = new Map()
	.set("owner", {
		name: "Owner",
		priority: 0,
	})
	.set("manager", {
		name: "Manager",
		priority: 1,
	})
	.set("user", {
		name: "User",
		priority: 2,
	});

function MemberCard({ member }) {
	return (
		<Card>
			<h4>{member.username}</h4>
			<InputBlock>
				Role: {roles.get(member.role)?.name ?? member.role}
			</InputBlock>
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
			{members
				.sort((a, b) => {
					let sort =
						(roles.get(a.role)?.priority ?? 0) -
						(roles.get(b.role)?.priority ?? 0);
					if (sort !== 0) return sort;

					sort = a.username.localeCompare(b.username);
					if (sort !== 0) return sort;

					return a.uid.localeCompare(b.uid);
				})
				.map((member) => (
					<MemberCard key={member.uid} member={member} />
				))}
		</>
	);
}
