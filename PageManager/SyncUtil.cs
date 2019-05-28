using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace PageManager
{
    public static class SyncUtil
    {
        public static TResult GetSync<T1, T2, T3, T4, TResult>(this ICollection target, Func<T1, T2, T3, T4, TResult> func, T1 arg1, T2 arg2, T3 arg3, T4 arg4)
        {
            throw new NotImplementedException();
        }

        public static TResult GetSync<T1, T2, T3, TResult>(this ICollection target, Func<T1, T2, T3, TResult> func, T1 arg1, T2 arg2, T3 arg3)
        {
            throw new NotImplementedException();
        }

        public static TResult GetSync<T1, T2, TResult>(this ICollection target, Func<T1, T2, TResult> func, T1 arg1, T2 arg2)
        {
            throw new NotImplementedException();
        }

        public static TResult GetSync<T, TResult>(this ICollection target, Func<T, TResult> func, T arg)
        {
            throw new NotImplementedException();
        }

        public static TResult GetSync<TResult>(this ICollection target, Func<TResult> func)
        {
            throw new NotImplementedException();
        }

        public static void InvokeSync<T1, T2, T3, T4>(this ICollection target, Action<T1, T2, T3, T4> action, T1 arg1, T2 arg2, T3 arg3, T4 arg4)
        {
            throw new NotImplementedException();
        }

        public static void InvokeSync<T1, T2, T3>(this ICollection target, Action<T1, T2, T3> action, T1 arg1, T2 arg2, T3 arg3)
        {
            throw new NotImplementedException();
        }

        public static void InvokeSync<T1, T2>(this ICollection target, Action<T1, T2> action, T1 arg1, T2 arg2)
        {
            throw new NotImplementedException();
        }

        public static void InvokeSync<T>(this ICollection target, Action<T> action, T arg)
        {
            throw new NotImplementedException();
        }

        public static void InvokeSync(this ICollection target, Action action)
        {
            throw new NotImplementedException();
        }

        public static bool TryGetSync<T1, T2, T3, T4, TResult>(this ICollection target, int millisecondsTimeout, bool requireLock, Func<T1, T2, T3, T4, TResult> func, T1 arg1, T2 arg2, T3 arg3, T4 arg4, out TResult result)
        {
            throw new NotImplementedException();
        }

        public static bool TryGetSync<T1, T2, T3, T4, TResult>(this ICollection target, int millisecondsTimeout, Func<T1, T2, T3, T4, TResult> func, T1 arg1, T2 arg2, T3 arg3, T4 arg4, out TResult result)
        {
            throw new NotImplementedException();
        }

        public static bool TryGetSync<T1, T2, T3, TResult>(this ICollection target, int millisecondsTimeout, bool requireLock, Func<T1, T2, T3, TResult> func, T1 arg1, T2 arg2, T3 arg3, out TResult result)
        {
            throw new NotImplementedException();
        }

        public static bool TryGetSync<T1, T2, T3, TResult>(this ICollection target, int millisecondsTimeout, Func<T1, T2, T3, TResult> func, T1 arg1, T2 arg2, T3 arg3, out TResult result)
        {
            throw new NotImplementedException();
        }

        public static bool TryGetSync<T1, T2, TResult>(this ICollection target, int millisecondsTimeout, bool requireLock, Func<T1, T2, TResult> func, T1 arg1, T2 arg2, out TResult result)
        {
            throw new NotImplementedException();
        }

        public static bool TryGetSync<T1, T2, TResult>(this ICollection target, int millisecondsTimeout, Func<T1, T2, TResult> func, T1 arg1, T2 arg2, out TResult result)
        {
            throw new NotImplementedException();
        }

        public static bool TryGetSync<T, TResult>(this ICollection target, int millisecondsTimeout, bool requireLock, Func<T, TResult> func, T arg, out TResult result)
        {
            throw new NotImplementedException();
        }

        public static bool TryGetSync<T, TResult>(this ICollection target, int millisecondsTimeout, Func<T, TResult> func, T arg, out TResult result)
        {
            throw new NotImplementedException();
        }

        public static bool TryGetSync<TResult>(this ICollection target, int millisecondsTimeout, bool requireLock, Func<TResult> func, out TResult result)
        {
            throw new NotImplementedException();
        }

        public static bool TryGetSync<TResult>(this ICollection target, int millisecondsTimeout, Func<TResult> func, out TResult result)
        {
            throw new NotImplementedException();
        }

        public static bool TryGetSync<T1, T2, T3, T4, TResult>(this ICollection target, TimeSpan timeout, bool requireLock, Func<T1, T2, T3, T4, TResult> func, T1 arg1, T2 arg2, T3 arg3, T4 arg4, out TResult result)
        {
            throw new NotImplementedException();
        }

        public static bool TryGetSync<T1, T2, T3, T4, TResult>(this ICollection target, TimeSpan timeout, Func<T1, T2, T3, T4, TResult> func, T1 arg1, T2 arg2, T3 arg3, T4 arg4, out TResult result)
        {
            throw new NotImplementedException();
        }

        public static bool TryGetSync<T1, T2, T3, TResult>(this ICollection target, TimeSpan timeout, bool requireLock, Func<T1, T2, T3, TResult> func, T1 arg1, T2 arg2, T3 arg3, out TResult result)
        {
            throw new NotImplementedException();
        }

        public static bool TryGetSync<T1, T2, T3, TResult>(this ICollection target, TimeSpan timeout, Func<T1, T2, T3, TResult> func, T1 arg1, T2 arg2, T3 arg3, out TResult result)
        {
            throw new NotImplementedException();
        }

        public static bool TryGetSync<T1, T2, TResult>(this ICollection target, TimeSpan timeout, bool requireLock, Func<T1, T2, TResult> func, T1 arg1, T2 arg2, out TResult result)
        {
            throw new NotImplementedException();
        }

        public static bool TryGetSync<T1, T2, TResult>(this ICollection target, TimeSpan timeout, Func<T1, T2, TResult> func, T1 arg1, T2 arg2, out TResult result)
        {
            throw new NotImplementedException();
        }

        public static bool TryGetSync<T, TResult>(this ICollection target, TimeSpan timeout, bool requireLock, Func<T, TResult> func, T arg, out TResult result)
        {
            throw new NotImplementedException();
        }

        public static bool TryGetSync<T, TResult>(this ICollection target, TimeSpan timeout, Func<T, TResult> func, T arg, out TResult result)
        {
            throw new NotImplementedException();
        }

        public static bool TryGetSync<TResult>(this ICollection target, TimeSpan timeout, bool requireLock, Func<TResult> func, out TResult result)
        {
            throw new NotImplementedException();
        }

        public static bool TryGetSync<TResult>(this ICollection target, TimeSpan timeout, Func<TResult> func, out TResult result)
        {
            throw new NotImplementedException();
        }

        public static bool TryGetSync<T1, T2, T3, T4, TResult>(this ICollection target, bool requireLock, Func<T1, T2, T3, T4, TResult> func, T1 arg1, T2 arg2, T3 arg3, T4 arg4, out TResult result)
        {
            throw new NotImplementedException();
        }

        public static bool TryGetSync<T1, T2, T3, T4, TResult>(this ICollection target, Func<T1, T2, T3, T4, TResult> func, T1 arg1, T2 arg2, T3 arg3, T4 arg4, out TResult result)
        {
            throw new NotImplementedException();
        }

        public static bool TryGetSync<T1, T2, T3, TResult>(this ICollection target, bool requireLock, Func<T1, T2, T3, TResult> func, T1 arg1, T2 arg2, T3 arg3, out TResult result)
        {
            throw new NotImplementedException();
        }

        public static bool TryGetSync<T1, T2, T3, TResult>(this ICollection target, Func<T1, T2, T3, TResult> func, T1 arg1, T2 arg2, T3 arg3, out TResult result)
        {
            throw new NotImplementedException();
        }

        public static bool TryGetSync<T1, T2, TResult>(this ICollection target, bool requireLock, Func<T1, T2, TResult> func, T1 arg1, T2 arg2, out TResult result)
        {
            throw new NotImplementedException();
        }

        public static bool TryGetSync<T1, T2, TResult>(this ICollection target, Func<T1, T2, TResult> func, T1 arg1, T2 arg2, out TResult result)
        {
            throw new NotImplementedException();
        }

        public static bool TryGetSync<T, TResult>(this ICollection target, bool requireLock, Func<T, TResult> func, T arg, out TResult result)
        {
            throw new NotImplementedException();
        }

        public static bool TryGetSync<T, TResult>(this ICollection target, Func<T, TResult> func, T arg, out TResult result)
        {
            throw new NotImplementedException();
        }

        public static bool TryGetSync<TResult>(this ICollection target, bool requireLock, Func<TResult> func, out TResult result)
        {
            throw new NotImplementedException();
        }

        public static bool TryGetSync<TResult>(this ICollection target, Func<TResult> func, out TResult result)
        {
            throw new NotImplementedException();
        }

        public static bool TryInvokeSync<T1, T2, T3, T4>(this ICollection target, int millisecondsTimeout, bool requireLock, Action<T1, T2, T3, T4> action, T1 arg1, T2 arg2, T3 arg3, T4 arg4)
        {
            throw new NotImplementedException();
        }

        public static bool TryInvokeSync<T1, T2, T3, T4>(this ICollection target, int millisecondsTimeout, Action<T1, T2, T3, T4> action, T1 arg1, T2 arg2, T3 arg3, T4 arg4)
        {
            throw new NotImplementedException();
        }

        public static bool TryInvokeSync<T1, T2, T3>(this ICollection target, int millisecondsTimeout, bool requireLock, Action<T1, T2, T3> action, T1 arg1, T2 arg2, T3 arg3)
        {
            throw new NotImplementedException();
        }

        public static bool TryInvokeSync<T1, T2, T3>(this ICollection target, int millisecondsTimeout, Action<T1, T2, T3> action, T1 arg1, T2 arg2, T3 arg3)
        {
            throw new NotImplementedException();
        }

        public static bool TryInvokeSync<T1, T2>(this ICollection target, int millisecondsTimeout, bool requireLock, Action<T1, T2> action, T1 arg1, T2 arg2)
        {
            throw new NotImplementedException();
        }

        public static bool TryInvokeSync<T1, T2>(this ICollection target, int millisecondsTimeout, Action<T1, T2> action, T1 arg1, T2 arg2)
        {
            throw new NotImplementedException();
        }

        public static bool TryInvokeSync<T>(this ICollection target, int millisecondsTimeout, bool requireLock, Action<T> action, T arg)
        {
            throw new NotImplementedException();
        }

        public static bool TryInvokeSync<T>(this ICollection target, int millisecondsTimeout, Action<T> action, T arg)
        {
            throw new NotImplementedException();
        }

        public static bool TryInvokeSync(this ICollection target, int millisecondsTimeout, bool requireLock, Action action)
        {
            throw new NotImplementedException();
        }

        public static bool TryInvokeSync(this ICollection target, int millisecondsTimeout, Action action)
        {
            throw new NotImplementedException();
        }

        public static bool TryInvokeSync<T1, T2, T3, T4>(this ICollection target, TimeSpan timeout, bool requireLock, Action<T1, T2, T3, T4> action, T1 arg1, T2 arg2, T3 arg3, T4 arg4)
        {
            throw new NotImplementedException();
        }

        public static bool TryInvokeSync<T1, T2, T3, T4>(this ICollection target, TimeSpan timeout, Action<T1, T2, T3, T4> action, T1 arg1, T2 arg2, T3 arg3, T4 arg4)
        {
            throw new NotImplementedException();
        }

        public static bool TryInvokeSync<T1, T2, T3>(this ICollection target, TimeSpan timeout, bool requireLock, Action<T1, T2, T3> action, T1 arg1, T2 arg2, T3 arg3)
        {
            throw new NotImplementedException();
        }

        public static bool TryInvokeSync<T1, T2, T3>(this ICollection target, TimeSpan timeout, Action<T1, T2, T3> action, T1 arg1, T2 arg2, T3 arg3)
        {
            throw new NotImplementedException();
        }

        public static bool TryInvokeSync<T1, T2>(this ICollection target, TimeSpan timeout, bool requireLock, Action<T1, T2> action, T1 arg1, T2 arg2)
        {
            throw new NotImplementedException();
        }

        public static bool TryInvokeSync<T1, T2>(this ICollection target, TimeSpan timeout, Action<T1, T2> action, T1 arg1, T2 arg2)
        {
            throw new NotImplementedException();
        }

        public static bool TryInvokeSync<T>(this ICollection target, TimeSpan timeout, bool requireLock, Action<T> action, T arg)
        {
            throw new NotImplementedException();
        }

        public static bool TryInvokeSync<T>(this ICollection target, TimeSpan timeout, Action<T> action, T arg)
        {
            throw new NotImplementedException();
        }

        public static bool TryInvokeSync(this ICollection target, TimeSpan timeout, bool requireLock, Action action)
        {
            throw new NotImplementedException();
        }

        public static bool TryInvokeSync(this ICollection target, TimeSpan timeout, Action action)
        {
            throw new NotImplementedException();
        }

        public static bool TryInvokeSync<T1, T2, T3, T4>(this ICollection target, bool requireLock, Action<T1, T2, T3, T4> action, T1 arg1, T2 arg2, T3 arg3, T4 arg4)
        {
            throw new NotImplementedException();
        }

        public static bool TryInvokeSync<T1, T2, T3, T4>(this ICollection target, Action<T1, T2, T3, T4> action, T1 arg1, T2 arg2, T3 arg3, T4 arg4)
        {
            throw new NotImplementedException();
        }

        public static bool TryInvokeSync<T1, T2, T3>(this ICollection target, bool requireLock, Action<T1, T2, T3> action, T1 arg1, T2 arg2, T3 arg3)
        {
            throw new NotImplementedException();
        }

        public static bool TryInvokeSync<T1, T2, T3>(this ICollection target, Action<T1, T2, T3> action, T1 arg1, T2 arg2, T3 arg3)
        {
            throw new NotImplementedException();
        }

        public static bool TryInvokeSync<T1, T2>(this ICollection target, bool requireLock, Action<T1, T2> action, T1 arg1, T2 arg2)
        {
            throw new NotImplementedException();
        }

        public static bool TryInvokeSync<T1, T2>(this ICollection target, Action<T1, T2> action, T1 arg1, T2 arg2)
        {
            throw new NotImplementedException();
        }

        public static bool TryInvokeSync<T>(this ICollection target, bool requireLock, Action<T> action, T arg)
        {
            throw new NotImplementedException();
        }

        public static bool TryInvokeSync<T>(this ICollection target, Action<T> action, T arg)
        {
            throw new NotImplementedException();
        }

        public static bool TryInvokeSync(this ICollection target, bool requireLock, Action action)
        {
            throw new NotImplementedException();
        }

        public static bool TryInvokeSync(this ICollection target, Action action)
        {
            throw new NotImplementedException();
        }

        public static TResult GetSync<T1, T2, T3, T4, TResult>(object syncRoot, Func<T1, T2, T3, T4, TResult> func, T1 arg1, T2 arg2, T3 arg3, T4 arg4)
        {
            throw new NotImplementedException();
        }

        public static TResult GetSync<T1, T2, T3, TResult>(object syncRoot, Func<T1, T2, T3, TResult> func, T1 arg1, T2 arg2, T3 arg3)
        {
            throw new NotImplementedException();
        }

        public static TResult GetSync<T1, T2, TResult>(object syncRoot, Func<T1, T2, TResult> func, T1 arg1, T2 arg2)
        {
            throw new NotImplementedException();
        }

        public static TResult GetSync<T, TResult>(object syncRoot, Func<T, TResult> func, T arg)
        {
            throw new NotImplementedException();
        }

        public static TResult GetSync<TResult>(object syncRoot, Func<TResult> func)
        {
            throw new NotImplementedException();
        }

        public static void InvokeSync<T1, T2, T3, T4>(object syncRoot, Action<T1, T2, T3, T4> action, T1 arg1, T2 arg2, T3 arg3, T4 arg4)
        {
            throw new NotImplementedException();
        }

        public static void InvokeSync<T1, T2, T3>(object syncRoot, Action<T1, T2, T3> action, T1 arg1, T2 arg2, T3 arg3)
        {
            throw new NotImplementedException();
        }

        public static void InvokeSync<T1, T2>(object syncRoot, Action<T1, T2> action, T1 arg1, T2 arg2)
        {
            throw new NotImplementedException();
        }

        public static void InvokeSync<T>(object syncRoot, Action<T> action, T arg)
        {
            throw new NotImplementedException();
        }

        public static void InvokeSync(object syncRoot, Action action)
        {
            throw new NotImplementedException();
        }

        public static bool TryGetSync<T1, T2, T3, T4, TResult>(object syncRoot, int millisecondsTimeout, bool requireLock, Func<T1, T2, T3, T4, TResult> func, T1 arg1, T2 arg2, T3 arg3, T4 arg4, out TResult result)
        {
            throw new NotImplementedException();
        }

        public static bool TryGetSync<T1, T2, T3, T4, TResult>(object syncRoot, int millisecondsTimeout, Func<T1, T2, T3, T4, TResult> func, T1 arg1, T2 arg2, T3 arg3, T4 arg4, out TResult result)
        {
            throw new NotImplementedException();
        }

        public static bool TryGetSync<T1, T2, T3, TResult>(object syncRoot, int millisecondsTimeout, bool requireLock, Func<T1, T2, T3, TResult> func, T1 arg1, T2 arg2, T3 arg3, out TResult result)
        {
            throw new NotImplementedException();
        }

        public static bool TryGetSync<T1, T2, T3, TResult>(object syncRoot, int millisecondsTimeout, Func<T1, T2, T3, TResult> func, T1 arg1, T2 arg2, T3 arg3, out TResult result)
        {
            throw new NotImplementedException();
        }

        public static bool TryGetSync<T1, T2, TResult>(object syncRoot, int millisecondsTimeout, bool requireLock, Func<T1, T2, TResult> func, T1 arg1, T2 arg2, out TResult result)
        {
            throw new NotImplementedException();
        }

        public static bool TryGetSync<T1, T2, TResult>(object syncRoot, int millisecondsTimeout, Func<T1, T2, TResult> func, T1 arg1, T2 arg2, out TResult result)
        {
            throw new NotImplementedException();
        }

        public static bool TryGetSync<T, TResult>(object syncRoot, int millisecondsTimeout, bool requireLock, Func<T, TResult> func, T arg, out TResult result)
        {
            throw new NotImplementedException();
        }

        public static bool TryGetSync<T, TResult>(object syncRoot, int millisecondsTimeout, Func<T, TResult> func, T arg, out TResult result)
        {
            throw new NotImplementedException();
        }

        public static bool TryGetSync<TResult>(object syncRoot, int millisecondsTimeout, bool requireLock, Func<TResult> func, out TResult result)
        {
            throw new NotImplementedException();
        }

        public static bool TryGetSync<TResult>(object syncRoot, int millisecondsTimeout, Func<TResult> func, out TResult result)
        {
            throw new NotImplementedException();
        }

        public static bool TryGetSync<T1, T2, T3, T4, TResult>(object syncRoot, TimeSpan timeout, bool requireLock, Func<T1, T2, T3, T4, TResult> func, T1 arg1, T2 arg2, T3 arg3, T4 arg4, out TResult result)
        {
            throw new NotImplementedException();
        }

        public static bool TryGetSync<T1, T2, T3, T4, TResult>(object syncRoot, TimeSpan timeout, Func<T1, T2, T3, T4, TResult> func, T1 arg1, T2 arg2, T3 arg3, T4 arg4, out TResult result)
        {
            throw new NotImplementedException();
        }

        public static bool TryGetSync<T1, T2, T3, TResult>(object syncRoot, TimeSpan timeout, bool requireLock, Func<T1, T2, T3, TResult> func, T1 arg1, T2 arg2, T3 arg3, out TResult result)
        {
            throw new NotImplementedException();
        }

        public static bool TryGetSync<T1, T2, T3, TResult>(object syncRoot, TimeSpan timeout, Func<T1, T2, T3, TResult> func, T1 arg1, T2 arg2, T3 arg3, out TResult result)
        {
            throw new NotImplementedException();
        }

        public static bool TryGetSync<T1, T2, TResult>(object syncRoot, TimeSpan timeout, bool requireLock, Func<T1, T2, TResult> func, T1 arg1, T2 arg2, out TResult result)
        {
            throw new NotImplementedException();
        }

        public static bool TryGetSync<T1, T2, TResult>(object syncRoot, TimeSpan timeout, Func<T1, T2, TResult> func, T1 arg1, T2 arg2, out TResult result)
        {
            throw new NotImplementedException();
        }

        public static bool TryGetSync<T, TResult>(object syncRoot, TimeSpan timeout, bool requireLock, Func<T, TResult> func, T arg, out TResult result)
        {
            throw new NotImplementedException();
        }

        public static bool TryGetSync<T, TResult>(object syncRoot, TimeSpan timeout, Func<T, TResult> func, T arg, out TResult result)
        {
            throw new NotImplementedException();
        }

        public static bool TryGetSync<TResult>(object syncRoot, TimeSpan timeout, bool requireLock, Func<TResult> func, out TResult result)
        {
            throw new NotImplementedException();
        }

        public static bool TryGetSync<TResult>(object syncRoot, TimeSpan timeout, Func<TResult> func, out TResult result)
        {
            throw new NotImplementedException();
        }

        public static bool TryGetSync<T1, T2, T3, T4, TResult>(object syncRoot, bool requireLock, Func<T1, T2, T3, T4, TResult> func, T1 arg1, T2 arg2, T3 arg3, T4 arg4, out TResult result)
        {
            throw new NotImplementedException();
        }

        public static bool TryGetSync<T1, T2, T3, T4, TResult>(object syncRoot, Func<T1, T2, T3, T4, TResult> func, T1 arg1, T2 arg2, T3 arg3, T4 arg4, out TResult result)
        {
            throw new NotImplementedException();
        }

        public static bool TryGetSync<T1, T2, T3, TResult>(object syncRoot, bool requireLock, Func<T1, T2, T3, TResult> func, T1 arg1, T2 arg2, T3 arg3, out TResult result)
        {
            throw new NotImplementedException();
        }

        public static bool TryGetSync<T1, T2, T3, TResult>(object syncRoot, Func<T1, T2, T3, TResult> func, T1 arg1, T2 arg2, T3 arg3, out TResult result)
        {
            throw new NotImplementedException();
        }

        public static bool TryGetSync<T1, T2, TResult>(object syncRoot, bool requireLock, Func<T1, T2, TResult> func, T1 arg1, T2 arg2, out TResult result)
        {
            throw new NotImplementedException();
        }

        public static bool TryGetSync<T1, T2, TResult>(object syncRoot, Func<T1, T2, TResult> func, T1 arg1, T2 arg2, out TResult result)
        {
            throw new NotImplementedException();
        }

        public static bool TryGetSync<T, TResult>(object syncRoot, bool requireLock, Func<T, TResult> func, T arg, out TResult result)
        {
            throw new NotImplementedException();
        }

        public static bool TryGetSync<T, TResult>(object syncRoot, Func<T, TResult> func, T arg, out TResult result)
        {
            throw new NotImplementedException();
        }

        public static bool TryGetSync<TResult>(object syncRoot, bool requireLock, Func<TResult> func, out TResult result)
        {
            throw new NotImplementedException();
        }

        public static bool TryGetSync<TResult>(object syncRoot, Func<TResult> func, out TResult result)
        {
            throw new NotImplementedException();
        }

        public static bool TryInvokeSync<T1, T2, T3, T4>(object syncRoot, int millisecondsTimeout, bool requireLock, Action<T1, T2, T3, T4> action, T1 arg1, T2 arg2, T3 arg3, T4 arg4)
        {
            throw new NotImplementedException();
        }

        public static bool TryInvokeSync<T1, T2, T3, T4>(object syncRoot, int millisecondsTimeout, Action<T1, T2, T3, T4> action, T1 arg1, T2 arg2, T3 arg3, T4 arg4)
        {
            throw new NotImplementedException();
        }

        public static bool TryInvokeSync<T1, T2, T3>(object syncRoot, int millisecondsTimeout, bool requireLock, Action<T1, T2, T3> action, T1 arg1, T2 arg2, T3 arg3)
        {
            throw new NotImplementedException();
        }

        public static bool TryInvokeSync<T1, T2, T3>(object syncRoot, int millisecondsTimeout, Action<T1, T2, T3> action, T1 arg1, T2 arg2, T3 arg3)
        {
            throw new NotImplementedException();
        }

        public static bool TryInvokeSync<T1, T2>(object syncRoot, int millisecondsTimeout, bool requireLock, Action<T1, T2> action, T1 arg1, T2 arg2)
        {
            throw new NotImplementedException();
        }

        public static bool TryInvokeSync<T1, T2>(object syncRoot, int millisecondsTimeout, Action<T1, T2> action, T1 arg1, T2 arg2)
        {
            throw new NotImplementedException();
        }

        public static bool TryInvokeSync<T>(object syncRoot, int millisecondsTimeout, bool requireLock, Action<T> action, T arg)
        {
            throw new NotImplementedException();
        }

        public static bool TryInvokeSync<T>(object syncRoot, int millisecondsTimeout, Action<T> action, T arg)
        {
            throw new NotImplementedException();
        }

        public static bool TryInvokeSync(object syncRoot, int millisecondsTimeout, bool requireLock, Action action)
        {
            throw new NotImplementedException();
        }

        public static bool TryInvokeSync(object syncRoot, int millisecondsTimeout, Action action)
        {
            throw new NotImplementedException();
        }

        public static bool TryInvokeSync<T1, T2, T3, T4>(object syncRoot, TimeSpan timeout, bool requireLock, Action<T1, T2, T3, T4> action, T1 arg1, T2 arg2, T3 arg3, T4 arg4)
        {
            throw new NotImplementedException();
        }

        public static bool TryInvokeSync<T1, T2, T3, T4>(object syncRoot, TimeSpan timeout, Action<T1, T2, T3, T4> action, T1 arg1, T2 arg2, T3 arg3, T4 arg4)
        {
            throw new NotImplementedException();
        }

        public static bool TryInvokeSync<T1, T2, T3>(object syncRoot, TimeSpan timeout, bool requireLock, Action<T1, T2, T3> action, T1 arg1, T2 arg2, T3 arg3)
        {
            throw new NotImplementedException();
        }

        public static bool TryInvokeSync<T1, T2, T3>(object syncRoot, TimeSpan timeout, Action<T1, T2, T3> action, T1 arg1, T2 arg2, T3 arg3)
        {
            throw new NotImplementedException();
        }

        public static bool TryInvokeSync<T1, T2>(object syncRoot, TimeSpan timeout, bool requireLock, Action<T1, T2> action, T1 arg1, T2 arg2)
        {
            throw new NotImplementedException();
        }

        public static bool TryInvokeSync<T1, T2>(object syncRoot, TimeSpan timeout, Action<T1, T2> action, T1 arg1, T2 arg2)
        {
            throw new NotImplementedException();
        }

        public static bool TryInvokeSync<T>(object syncRoot, TimeSpan timeout, bool requireLock, Action<T> action, T arg)
        {
            throw new NotImplementedException();
        }

        public static bool TryInvokeSync<T>(object syncRoot, TimeSpan timeout, Action<T> action, T arg)
        {
            throw new NotImplementedException();
        }

        public static bool TryInvokeSync(object syncRoot, TimeSpan timeout, bool requireLock, Action action)
        {
            throw new NotImplementedException();
        }

        public static bool TryInvokeSync(object syncRoot, TimeSpan timeout, Action action)
        {
            throw new NotImplementedException();
        }

        public static bool TryInvokeSync<T1, T2, T3, T4>(object syncRoot, bool requireLock, Action<T1, T2, T3, T4> action, T1 arg1, T2 arg2, T3 arg3, T4 arg4)
        {
            throw new NotImplementedException();
        }

        public static bool TryInvokeSync<T1, T2, T3, T4>(object syncRoot, Action<T1, T2, T3, T4> action, T1 arg1, T2 arg2, T3 arg3, T4 arg4)
        {
            throw new NotImplementedException();
        }

        public static bool TryInvokeSync<T1, T2, T3>(object syncRoot, bool requireLock, Action<T1, T2, T3> action, T1 arg1, T2 arg2, T3 arg3)
        {
            throw new NotImplementedException();
        }

        public static bool TryInvokeSync<T1, T2, T3>(object syncRoot, Action<T1, T2, T3> action, T1 arg1, T2 arg2, T3 arg3)
        {
            throw new NotImplementedException();
        }

        public static bool TryInvokeSync<T1, T2>(object syncRoot, bool requireLock, Action<T1, T2> action, T1 arg1, T2 arg2)
        {
            throw new NotImplementedException();
        }

        public static bool TryInvokeSync<T1, T2>(object syncRoot, Action<T1, T2> action, T1 arg1, T2 arg2)
        {
            throw new NotImplementedException();
        }

        public static bool TryInvokeSync<T>(object syncRoot, bool requireLock, Action<T> action, T arg)
        {
            throw new NotImplementedException();
        }

        public static bool TryInvokeSync<T>(object syncRoot, Action<T> action, T arg)
        {
            throw new NotImplementedException();
        }

        public static bool TryInvokeSync(object syncRoot, bool requireLock, Action action)
        {
            throw new NotImplementedException();
        }

        public static bool TryInvokeSync(object syncRoot, Action action)
        {
            throw new NotImplementedException();
        }
    }
}
