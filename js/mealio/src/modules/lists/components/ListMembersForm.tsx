import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import List from "@/modules/lists/entities/List";
import ListMember, {
  LIST_MEMBER_COLLECTION,
} from "@/modules/lists/entities/ListMembers";
import { useEffect, useState } from "react";
import User, { USER_COLLECTION } from "@/modules/auth/entities/User";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Cross2Icon } from "@radix-ui/react-icons";
import ListMemberAttachForm from "@/modules/lists/components/ListMemberAttachForm";
import { useListMemberService } from "@/modules/lists/services/ListMemberService";

type Props = {
  list: List;
};

const ListMembersForm: React.FC<Props> = (props) => {
  const [listMembers, setListMembers] = useState<ListMember[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const { destroyListMember } = useListMemberService();

  useEffect(() => {
    const listMembersQuery = query(
      collection(db, LIST_MEMBER_COLLECTION),
      where("listId", "==", props.list.id)
    );

    const unsubscribe = onSnapshot(listMembersQuery, (querySnapshot) => {
      const items = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        } as ListMember;
      });
      setListMembers(items);
    });

    return () => {
      unsubscribe();
    };
  }, [props.list]);

  useEffect(() => {
    if (!listMembers.length) {
      setUsers([]);

      return;
    }

    const usersQuery = query(
      collection(db, USER_COLLECTION),
      where(
        "uid",
        "in",
        listMembers.map((item) => item.userId)
      )
    );

    const unsubscribe = onSnapshot(usersQuery, (querySnapshot) => {
      const items = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        } as User;
      });
      setUsers(items);
    });

    return () => {
      unsubscribe();
    };
  }, [listMembers]);

  const onDelete = (uid: string) => {
    return async () => {
      await destroyListMember(uid);
    };
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="relative">
          Members <ListMemberAttachForm list={props.list} />
        </CardTitle>
        <CardDescription>Users who have access to the list</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.map((user) => (
            <Button
              key={user.id}
              className="w-full justify-start"
              variant={"outline"}
            >
              <div className="flex justify-between items-center w-full">
                <span>{user.email}</span>
                {user.uid !== props.list.ownerId && (
                  <Cross2Icon
                    className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"
                    onClick={onDelete(user.uid)}
                  />
                )}
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ListMembersForm;
