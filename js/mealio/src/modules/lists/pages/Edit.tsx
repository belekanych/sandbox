import MainLayout from "@/components/layout/MainLayout";
import Loading from "@/modules/auth/pages/Loading";
import ListDeleteForm from "@/modules/lists/components/ListDeleteForm";
import ListEditForm from "@/modules/lists/components/ListEditForm";
import ListMembersForm from "@/modules/lists/components/ListMembersForm";
import { selectLists } from "@/modules/lists/store";
import { useAppSelector } from "@/store/hooks";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

function Edit() {
  const { id } = useParams();
  const lists = useAppSelector(selectLists);

  const list = useMemo(() => {
    return lists.filter((list) => list.id === id)[0];
  }, [id, lists]);

  return (
    <MainLayout
      title="Lists > Edit"
      header={list ? <ListDeleteForm list={list} /> : undefined}
    >
      {list ? (
        <>
          <ListMembersForm list={list} />
          <ListEditForm list={list} />
        </>
      ) : (
        <Loading />
      )}
    </MainLayout>
  );
}

export default Edit;
