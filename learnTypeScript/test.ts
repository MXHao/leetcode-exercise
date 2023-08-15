
  class ListNode {
      val: number
      next: ListNode | null
      constructor(val?: number, next?: ListNode | null) {
          this.val = (val===undefined ? 0 : val)
          this.next = (next===undefined ? null : next)
      }
  }
 

 function isPalindrome(head: ListNode | null): boolean {
    if (!head) return true;

    let fast: ListNode = head;
    let slow: ListNode = head;
    let preNode: ListNode | null = null;

    while (fast && fast.next) {
        // 快指针一次走两步
        fast = fast.next.next;
        
        // 反转前半部分链表
        let nextNode = slow.next;
        slow.next = preNode;
        preNode = slow;
        slow = nextNode;
    }

    // 当 fast 结点不为 null 时，表示输入链表结点数为奇数个，此时 slow 需要往后走一个结点再进行比较
    if (fast) {
        slow = slow.next;
    }

    // 剩余的链表与反转后的链表进行结点一一比较
    while (preNode && slow) {
        if (preNode.val !== slow.val) {
            return false;
        }

        preNode = preNode.next;
        slow = slow.next;
    }

    return true;
};