import MainLayout from "@/components/layout/MainLayout";
import ListDeleteForm from "@/modules/lists/components/ListDeleteForm";
import ListEditForm from "@/modules/lists/components/ListEditForm";
import ListMembersForm from "@/modules/lists/components/ListMembersForm";
import { useList } from "@/modules/lists/contexts/ListContext";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

function Edit() {
  const { id } = useParams();
  const { lists } = useList();

  const list = useMemo(() => {
    return lists.filter((list) => list.id === id)[0];
  }, [id, lists]);

  return (
    <MainLayout title="Lists > Edit">
      {list ? (
        <>
          <ListEditForm list={list} />
          <ListMembersForm list={list} />
          <ListDeleteForm list={list} />
        </>
      ) : (
        <span>Loading...</span>
      )}
    </MainLayout>
  );
}

export default Edit;
