export interface Team {
	id?: number;
	name: string;
	members: TeamMember[];
}

export interface TeamMember {
	id: number;
	role: string;
}
