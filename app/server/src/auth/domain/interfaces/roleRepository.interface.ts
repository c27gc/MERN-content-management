export interface IRoleRepository {
    findByName(roleName: string): Promise<string | null>;
}
