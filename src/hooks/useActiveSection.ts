import { useEffect, useState } from 'react';

// 固定式導覽列高度 (64px) 加上一點緩衝，區塊頂端越過此線即視為目前所在區塊
const ACTIVE_LINE = 96;

/**
 * 依捲動位置回傳目前所在區塊的 id（尚未捲過第一個區塊時為 null）。
 * ids 需依頁面由上而下排序；巢狀區塊（如 about 內的 skills）自然落在較後者。
 */
export function useActiveSection(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(null);
  const idsKey = ids.join('|');

  useEffect(() => {
    const sectionIds = idsKey ? idsKey.split('|') : [];
    let frame = 0;

    const update = () => {
      frame = 0;
      // 頁尾區塊較短，頂端可能永遠到不了判定線，捲到底時直接視為最後一個區塊
      const atBottom =
        window.scrollY > 0 &&
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;

      let current: string | null = null;
      if (atBottom && sectionIds.length > 0) {
        current = sectionIds[sectionIds.length - 1];
      } else {
        for (const id of sectionIds) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= ACTIVE_LINE) current = id;
        }
      }
      setActive(current);
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [idsKey]);

  return active;
}
